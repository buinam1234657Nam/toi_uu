import { QUERY_KEY } from "@/constants/queryKey"
import HttpRequest from "@/utils/HttpRequest"
import { useQuery } from "@tanstack/react-query"

const fetcher = async (params: { page: number, limit: number }) => {
    const res = await HttpRequest.get(`product/discount?page=${params.page}&limit=${params.limit}`)
    return res
}

export const useGetProductDiscount = (params: { page: number, limit: number }, enabled: boolean = false) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_PRODUCT_DISCOUNT, params.page, params.limit],
        queryFn: () => fetcher(params),
        select: (data) => data.data,
        enabled: enabled
    })
}