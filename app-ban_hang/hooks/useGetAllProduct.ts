import { QUERY_KEY } from "@/constants/queryKey"
import HttpRequest from "@/utils/HttpRequest"
import { useQuery } from "@tanstack/react-query"

const fetcher = async () => {
    const res = await HttpRequest.get("product")
    return res
}

export const useGetAllProduct = () => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_ALL_PRODUCT],
        queryFn: () => fetcher(),
        select: (data) => data,
    })
}