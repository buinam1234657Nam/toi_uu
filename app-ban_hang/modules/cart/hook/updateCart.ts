import { AlertTypes, Notification } from "@/components/Notification"
import { appStore } from "@/store"
import HttpRequest from "@/utils/HttpRequest"
import { useMutation } from "@tanstack/react-query"

export interface IProductDetail {
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
}

export interface IUpdateCartItem {
    productId: string;
    detail: IProductDetail;
    quantity: number;
}

export interface IUpdateCart {
    userId: string;
    products: IUpdateCartItem[];
}

const fetcher = async (data: IUpdateCart): Promise<any> => {
    try {
        const res = await HttpRequest.put("cart", data)
        return res.data
    } catch (error) {
        console.error('Error updating cart:', error)
        throw error
    }
}

export const useUpdateCart = (onSuccess?: () => void) => {
    const { setCartInfo } = appStore()
    return useMutation<any, Error, IUpdateCart>({
        mutationFn: fetcher,
        onSuccess: (data) => {
            onSuccess && onSuccess()
            setCartInfo(data)
        },
        onError: (error: Error) => {
            console.error('Error in useUpdateCart:', error)
            Notification({
                description: "Cập nhật giỏ hàng thất bại: " + error.message,
                alertType: AlertTypes.ERROR
            })
        }
    })
}