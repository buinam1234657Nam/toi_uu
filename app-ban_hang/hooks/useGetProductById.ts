import { QUERY_KEY } from "@/constants/queryKey"
import HttpRequest from "@/utils/HttpRequest"
import { useQuery } from "@tanstack/react-query"

const fetcher = async (id: string) => {
    const res = await HttpRequest.get(`product/${id}`)
    return res
}

export const useGetProductById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_PRODUCT_BY_ID, id],
        queryFn: () => fetcher(id),
        select: (data) => data.data,
        enabled: !!id
    })
}
