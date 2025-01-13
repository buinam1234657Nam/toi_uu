import axios from 'axios';
import CryptoJS from 'crypto-js';
import express, { Request, Response } from 'express';
import moment from 'moment';
import Order, { IOrder } from '../model/order.model';
import cartService from './cart.service';
import Product from '../model/product.model';
import basicXSSSanitizer from '../utils/basicXSSSanitizer';
import { Decrypt } from '../utils/aesencryption ';
const routerPayment = express.Router();
const config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};
const getCoordinatesFromAddress = async (address: string) => {
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        } else {
            throw new Error("Không tìm thấy địa chỉ.");
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) {
                console.error("Access forbidden: ", error.response.data);
                throw new Error(error.response.data);
            }
        }
        console.error("Error fetching coordinates:", (error as Error).message);
        throw new Error("Có lỗi xảy ra khi lấy tọa độ.");
    }
};
routerPayment.post('/payment', async (req: Request, res: Response) => {
    console.log(2312)
    try {
        const { user_id, amount, phone, address, items } = req.body;
        const embed_data = {
            redirecturl: 'myapp://payment-success',
            phone: Decrypt(phone),
            address: Decrypt(address),
        };
        const transID = Math.floor(Math.random() * 1000000);
        const order: any = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: user_id,
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: Number(Decrypt(amount)),
            callback_url: 'https://1cf0-1-52-196-160.ngrok-free.app/api/callback',
            description: `Thanh toán đơn hàng`,
            bank_code: '',
        };
        const data =
            config.app_id +
            '|' +
            order.app_trans_id +
            '|' +
            order.app_user +
            '|' +
            order.amount +
            '|' +
            order.app_time +
            '|' +
            order.embed_data +
            '|' +
            order.item;

        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const result = await axios.post(config.endpoint, null, { params: order });
        return res.status(200).json(result.data);
    } catch (error) {
        console.error('Error in payment route:', error);
        return res.status(500).json({ error: 'An error occurred while processing the payment' });
    }
});

routerPayment.post('/callback', async (req: Request, res: Response) => {
    let result: { return_code: number; return_message: string } = { return_code: 0, return_message: '' };
    try {
        const dataStr = req.body.data;
        const reqMac = req.body.mac;
        const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        if (reqMac !== mac) {
            result.return_code = -1;
            result.return_message = 'mac not equal';
        } else {
            const dataJson = JSON.parse(dataStr);
            result.return_code = 1;
            result.return_message = 'success';
            const customer = dataJson.app_user.split("-");
            const { phone, address } = JSON.parse(dataJson.embed_data);
            const lat = (await getCoordinatesFromAddress(address)).latitude;
            const long = (await getCoordinatesFromAddress(address)).longitude;
            const order: IOrder = {
                orderNo:basicXSSSanitizer(dataJson.app_trans_id),
                customerId:basicXSSSanitizer(customer[0].trim()),
                customerName:basicXSSSanitizer(customer[1]),
                customerPhone:basicXSSSanitizer(phone),
                shippingAddress:basicXSSSanitizer(address),
                endShipperLocation: {
                    latitude: lat,
                    longitude: long
                },
                orderStatus: 1,
                items: JSON.parse(dataJson.item),
                totalAmount: dataJson.amount,
            };
            const newOrder = await Order.create(order);
            await cartService.deleteProductInCart({
                userId: customer[0].trim(),
                productId: order.items?.map(item => item.product_id) || []
            });
            order.items?.forEach(async (item: any) => {
                const product = await Product.findById(item.product_id);
                if (product) {
                    product.quantity_sales += item.quantity;
                    await product.save();
                }
            });
            return res.json(newOrder);
        }
    } catch (ex: any) {
        console.log('lỗi:::' + ex.message);
        result.return_code = 0;
        result.return_message = ex.message;
    }
    res.json(result);
});

export default routerPayment;
