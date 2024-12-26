import Cart from "../model/cart.model";
import DOMPurify from 'dompurify';

export interface IUpdateCartItem {
    productId: string;
    detail: {
        preview: {
            image: string;
            color: string;
            bgColor: string;
        };
        name: string;
        size: number;
        real_price: number;
        sale_price: number;
        quantity_import: number;
        quantity_sale: number;
    };
    quantity: number;
}
export interface IDeleteProductInCart {
    userId: string,
    productId: string[]
}
export interface IUpdateCart {
    userId: string;
    products: IUpdateCartItem[];
}

//  get cart by user id
const getCartByUserId = async (userId: string) => {
    try {
        const res = await Cart.findOne({ user_id: userId });
        return res;
    } catch (error) {
        throw Error(error as string)
    }
}
// create cart
const createCart = async (userId: string) => {
    try {
        const res = await Cart.create({ user_id: userId, products: [] });
        return res;
    } catch (error) {
        throw Error(error as string)
    }
}
// update cart 
const updateCart = async (data: IUpdateCart) => {
    try {
        const cart = await Cart.findOne({ user_id: data.userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        data.products.forEach(updateItem => {
            const productIndex = cart.products.findIndex(p => p.product_id === updateItem.productId);
            if (productIndex > -1) {
                cart.products[productIndex] = {
                    product_id: updateItem.productId,
                    detail: {
                        preview: {
                            image: updateItem.detail.preview.image,
                            color: updateItem.detail.preview.color,
                            bgColor: updateItem.detail.preview.bgColor,
                        },
                        name: updateItem.detail.name,
                        size: updateItem.detail.size,
                        real_price: updateItem.detail.real_price,
                        sale_price: updateItem.detail.sale_price,
                        quantity_import: updateItem.detail.quantity_import,
                        quantity_sale: updateItem.detail.quantity_sale,
                    },
                    quantity: updateItem.quantity
                };
            } else {
                cart.products.push({
                    product_id:  DOMPurify.sanitize(updateItem.productId),
                    detail: {
                        preview: {
                            image:  DOMPurify.sanitize(updateItem.detail.preview.image),
                            color: DOMPurify.sanitize(updateItem.detail.preview.color),
                            bgColor: DOMPurify.sanitize(updateItem.detail.preview.bgColor),
                        },
                        name: DOMPurify.sanitize(updateItem.detail.name),
                        size: updateItem.detail.size,
                        real_price: updateItem.detail.real_price,
                        sale_price: updateItem.detail.sale_price,
                        quantity_import: updateItem.detail.quantity_import,
                        quantity_sale: updateItem.detail.quantity_sale,
                    },
                    quantity: updateItem.quantity
                });
            }
        });

        const updatedCart = await cart.save();
        return updatedCart;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred while updating the cart');
    }
}
// delete product in cart
const deleteProductInCart = async (data: IDeleteProductInCart) => {
    try {
        const cart = await Cart.findOne({ user_id: data.userId });
        if (!cart) {
            throw new Error('Cart not found');
        }
        cart.products = cart.products.filter(p => !data.productId.includes(p.product_id));
        const updatedCart = await cart.save();
        return updatedCart;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred while deleting the product from the cart');
    }
}
const deleteCart = async (userId: string) => {
    try {
        const cart = Cart.findOneAndDelete({ user_id: userId });
        return cart
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred while deleting the cart');
    }
}
export default {
    getCartByUserId,
    createCart,
    updateCart,
    deleteProductInCart,
    deleteCart
}