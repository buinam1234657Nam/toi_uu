import axios from "axios"
import Order, { IOrder } from "../model/order.model"
interface IPayloadOrder extends IOrder {
    _id: string
}
const createOrder = async (order: IOrder) => {
    try {
        const newOrder = await Order.create(order)
        return newOrder
    } catch (error) {
        throw Error(error as string)
    }
}
const getOrder = async (userId: string) => {
    try {
        const order = await Order.find({ customerId: userId })
        return order
    } catch (error) {
        throw Error(error as string)
    }
}
const getOrderById = async (id: string) => {
    try {
        const order = await Order.findById(id)
        return order
    } catch (error) {
        throw Error(error as string)
    }
}

const updateOrder = async (orderStatus: number, id: string) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus })
        return updatedOrder
    } catch (error) {
        throw Error(error as string)
    }
}
const deleteOrder = async (orderId: string) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId)
        return deletedOrder
    } catch (error) {
        throw Error(error as string)
    }
}

const getAllOrder = async () => {
    try {
        const orders = await Order.find({})
        return orders
    } catch (error) {
        throw Error(error as string)
    }
}

const getLocationShipper = async (id: string, address: string) => {
    try {
        const latitude = 20.965213089957036;
        const longitude = 105.76567397584012;
        const order = await Order.findById(id).select("endShipperLocation");
        if (!order) {
            throw new Error("Order not found.");
        }
        if (!order.endShipperLocation) {
            throw new Error("End shipper location not found.");
        }
        const { latitude: startLatitude, longitude: startLongitude } = order.endShipperLocation;
        const totalSteps = 500;
        let step = 0;

        const interval = setInterval(async () => {
            if (step < totalSteps) {
                const latStep = (startLatitude - latitude) / totalSteps;
                const lngStep = (startLongitude - longitude) / totalSteps;

                const newLatitude = latitude + latStep * step;
                const newLongitude = longitude + lngStep * step;

                await Order.findByIdAndUpdate(id, {
                    shipperLocation: {
                        latitude: newLatitude,
                        longitude: newLongitude
                    }
                }, { new: true });

                step++;
            } else {
                await Order.findByIdAndUpdate(id, {
                    orderStatus: 3
                }, { new: true });
                clearInterval(interval);
                console.log("Shipper đã đến điểm kết thúc!");
            }
        }, 120);

        return { message: "Bắt đầu cập nhật vị trí shipper." };
    } catch (error) {
        console.error("Có lỗi xảy ra khi cập nhật vị trí:", error);
        throw new Error(error as string);
    }
};
export default {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getAllOrder,
    getLocationShipper,
    getOrderById
}



