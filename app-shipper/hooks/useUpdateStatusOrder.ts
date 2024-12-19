import { Notification } from "@/components/Notification"
import HttpRequest from "@/utils/HttpRequest"
import { useMutation, useQueryClient } from "@tanstack/react-query"
export interface IPayloadUpdateStatusOrder {
    orderStatus: number
    id: string
}
const fetcher = async (payload: IPayloadUpdateStatusOrder) => {
    const res = await HttpRequest.put("/order", payload)
    return res
}
export const useUpdateStatusOrder = (onSuccess: (data: any) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: fetcher,
        onSuccess: (data) => {
            Notification({
                description: "Cập nhật trạng thái đơn hàng thành công",
                alertType: "success"
            })
            queryClient.invalidateQueries({ queryKey: ["allOrder"] })
            onSuccess && onSuccess(data.data)
        }
    })
}
