import HttpRequest from "@/utils/HttpRequest"
import { useMutation } from "@tanstack/react-query"

const fetcher = async (orderId: string) => {
    const res = await HttpRequest.delete(`/order/${orderId}`)
    return res
}
const useDeleteOrder = () => {
    return useMutation({
        mutationFn: fetcher,
        onSuccess: () => {
            console.log("Delete thanh cong")
        }
    })
}
export default useDeleteOrder