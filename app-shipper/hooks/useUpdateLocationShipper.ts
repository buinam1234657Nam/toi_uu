import { useMutation } from "@tanstack/react-query"

import HttpRequest from "@/utils/HttpRequest"

const fetcher = async (data: any) => {
    const res = await HttpRequest.put(`/order/location/${data.orderId}`, {
        address: data.address
    })
    return res
}
const useUpdateLocationShipper = () => {
    return useMutation({
        mutationFn: fetcher,
        onSuccess: (data) => {
            console.log(data)
        }
    })
}
export default useUpdateLocationShipper