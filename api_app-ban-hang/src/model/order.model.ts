import mongoose, { Schema } from "mongoose";
import paginate from 'mongoose-paginate-v2'; // Ensure you have this import if you're using pagination

export interface IOrder {
    customerId: string;
    customerName: string; // Tên khách hàng
    customerEmail?: string; // Email khách hàng
    customerPhone?: string; // Số điện thoại khách hàng
    shippingAddress?: string;
    shipperLocation?: {
        latitude: number;
        longitude: number;
    };
    endShipperLocation?: {
        latitude: any;
        longitude: any;
    };
    orderDate?: Date;
    orderStatus?: number;
    items?: any[];
    totalAmount: number;
    orderNo: string;
}
export enum OrderStatus {
    PENDING = 1,
    PAID = 2,
}
interface OrderItemDTO {
    productId: string; // Mã sản phẩm
    productName: string; // Tên sản phẩm
    quantity: number; // Số lượng sản phẩm
    price: number; // Giá tiền mỗi sản phẩm
    totalPrice: number; // Tổng giá cho sản phẩm đó
}

interface OrderDocument extends mongoose.Document, IOrder { }

const orderSchema: Schema = new Schema({
    customerId: {
        type: String,
    },
    orderNo: {
        type: String,
    },
    customerName: {
        type: String,
    },
    customerPhone: {
        type: String,
    },
    shippingAddress: {
        type: String,
    },
    orderStatus: {
        type: Number
    },
    shipperLocation: {
        type: Object
    },
    endShipperLocation: {
        type: Object
    },
    items: {
        type: []
    },
    totalAmount: {
        type: Number,
    },
}, {
    timestamps: true
});

// Apply pagination plugin
orderSchema.plugin(paginate);

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export default Order;