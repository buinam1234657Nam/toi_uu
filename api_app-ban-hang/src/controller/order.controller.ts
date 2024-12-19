import { Request, Response } from "express"
import orderService from "../service/order.service"

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderService.createOrder(req.body)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const getAllOrder = async (req: Request, res: Response) => {
    try {
        const orders = await orderService.getAllOrder()
        return res.status(200).json(orders)
    }
    catch (error) {
        return res.status(500).json(error)
    }
}
const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await orderService.getOrderById(req.params.id)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderService.getOrder(req.params.userId)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const updateOrder = async (req: Request, res: Response) => {
    const { orderStatus, id } = req.body
    try {
        const order = await orderService.updateOrder(orderStatus, id)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const deleteOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderService.deleteOrder(req.params.orderId)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const getLocationShipper = async (req: Request, res: Response) => {
    try {
        const order = await orderService.getLocationShipper(req.params.orderId, req.body.address)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export default {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getAllOrder,
    getLocationShipper,
    getOrderById
}

