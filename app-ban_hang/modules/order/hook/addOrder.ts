import HttpRequest from "@/utils/HttpRequest";
import { useMutation } from "@tanstack/react-query";

export interface IOrder {
    user_id: string;
    products: {
        product_id: string;
        detail: {
            color: string;
            size: number;
        };
        quantity: number;
    }[];
    status: string;
    total_price: number;
    address: string;
    phone: string;
    name: string;
}
const fetcher = async (data: IOrder) => {
    const res = await HttpRequest.post("order", data)
    return res
}
const useAddOrder = () => {
    return useMutation({
        mutationFn: fetcher,
        onSuccess: () => {
            console.log("Add thanh cong")
        }
    })
}
export default useAddOrder