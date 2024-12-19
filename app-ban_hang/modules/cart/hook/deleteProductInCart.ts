import { AlertTypes, Notification } from "@/components/Notification"
import { QUERY_KEY } from "@/constants/queryKey"
import HttpRequest from "@/utils/HttpRequest"
import { useMutation, useQueryClient } from "@tanstack/react-query"
export interface IDeleteProductInCart {
    userId: string
    productId: string[]
}
const fetcher = async (data: IDeleteProductInCart) => {
    const res = await HttpRequest.delete("cart", {
        data: data
    })
    return res
}
export const useDeleteProductInCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: fetcher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CART_BY_USER_ID] })
            Notification({
                description: "Xóa thành công",
                alertType: AlertTypes.SUCCESS
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}