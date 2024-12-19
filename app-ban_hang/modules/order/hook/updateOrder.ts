import HttpRequest from "@/utils/HttpRequest"
import { useMutation } from "@tanstack/react-query"
import { IOrder } from "./addOrder"

const fetcher = async (order: IOrder) => {
    const res = await HttpRequest.put("/order", order)
    return res
}
const useUpdateOrder = () => {
    return useMutation({
        mutationFn: fetcher,
        onSuccess: () => {
            console.log("Update thanh cong")
        },
        onError: (error) => {
            console.log(error)
        }
    })
}
export default useUpdateOrder
