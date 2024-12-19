import HttpRequest from "@/utils/HttpRequest"
import { useQuery } from "@tanstack/react-query"

const fetcher = async () => {
    const res = await HttpRequest.get("/order")
    return res
}
const useGetOrder = () => {
    return useQuery({
        queryKey: ["allOrder"],
        queryFn: () => fetcher(),
        select: (data) => data.data,
        refetchInterval: 10000
    })
}
export default useGetOrder