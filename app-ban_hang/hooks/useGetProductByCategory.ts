import { QUERY_KEY } from "@/constants/queryKey"
import { IProduct } from "@/types"
import HttpRequest from "@/utils/HttpRequest"
import { useQuery } from "@tanstack/react-query"

const fetcher = async (type: number) => {
    const res = await HttpRequest.get<IProduct[]>(`product/category?type=${type}`)
    return res
}
export const useGetProductByCategory = (type: number) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_PRODUCT_BY_CATEGORY, type],
        queryFn: () => fetcher(type),
        select: (data) => data,
        enabled: !!type
    })
}

