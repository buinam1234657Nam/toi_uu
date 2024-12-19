import { QUERY_KEY } from "@/constants/queryKey"
import HttpRequest from "@/utils/HttpRequest"
import { useQuery } from "@tanstack/react-query"

const fetcher = async (userId: string) => {
    const res = await HttpRequest.get(`/order/${userId}`)
    return res
}
const useGetOrder = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_ORDER_BY_USER_, userId],
        queryFn: () => fetcher(userId),
        select: (data) => data.data,
        refetchInterval: 5000
    })
}
export default useGetOrder