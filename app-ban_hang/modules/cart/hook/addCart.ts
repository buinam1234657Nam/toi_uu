import { AlertTypes, Notification } from "@/components/Notification"
import HttpRequest from "@/utils/HttpRequest"
import { useMutation } from "@tanstack/react-query"

const fetcher = async (userId: string) => {
    const res = await HttpRequest.post("cart", userId)
    return res
}
export const useAddCart = () => {
    return useMutation({
        mutationFn: fetcher,
        onSuccess: () => {
            Notification({
                description: "Thêm sản phẩm thành công",
                alertType: AlertTypes.SUCCESS
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}