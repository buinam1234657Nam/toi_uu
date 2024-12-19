import { AnyElement } from "@/constants";
import HttpRequest from "@/utils/HttpRequest";
import { useMutation } from "@tanstack/react-query";

const fetcher = async (data: AnyElement) => {
    const res = HttpRequest.post("/payment", data)
    return res
}
const useCreatePayment = (onSuccess: (data: any) => void) => {
    return useMutation({
        mutationFn: fetcher,
        onSuccess: (data) => {
            onSuccess && onSuccess(data)
        }
    })
}
export default useCreatePayment
