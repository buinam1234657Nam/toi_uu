import { Request, Response } from "express";
import cartService from "../service/cart.service";

const getCartByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const cart = await cartService.getCartByUserId(userId);
    res.status(200).json(cart);
}

const createCart = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const cart = await cartService.createCart(userId);
    res.status(201).json(cart);
}

const updateCart = async (req: Request, res: Response) => {
    const cart = await cartService.updateCart(req.body);
    res.status(200).json(cart);
}

const deleteProductInCart = async (req: Request, res: Response) => {
    const cart = await cartService.deleteProductInCart(req.body);
    res.status(200).json(cart);
}
const deleteCart = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const cart = await cartService.deleteCart(userId);
    res.status(200).json(cart);
}
export default {
    getCartByUserId,
    createCart,
    updateCart,
    deleteProductInCart,
    deleteCart
}