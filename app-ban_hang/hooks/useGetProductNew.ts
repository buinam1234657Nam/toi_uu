import { AnyElement } from "@/constants"
import { QUERY_KEY } from "@/constants/queryKey"
import { IProduct } from "@/types"
import HttpRequest from "@/utils/HttpRequest"
import { useQuery } from "@tanstack/react-query"

const fetcher = async (params: { page: number, limit: number }) => {
    const res = await HttpRequest.get<IProduct[], AnyElement>(`product/new?page=${params.page}&limit=${params.limit}`)
    return res
}

export const useGetProductNew = (params: { page: number, limit: number }, enabled: boolean = false) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_PRODUCT_NEW, params.page, params.limit],
        queryFn: () => fetcher(params),
        select: (data) => data.data,
        enabled: enabled,
    })
}