import { IProduct } from './../../api_app-ban-hang/src/model/product.model';
import { QUERY_KEY } from "@/constants/queryKey"
import HttpRequest from "@/utils/HttpRequest"
import { useMutation, useQuery } from "@tanstack/react-query"

const fetcher = async (filter: string) => {
    const res = await HttpRequest.get(`product/search?q=${filter}`)
    return res
}

export const useGetFilterProduct = (onSuccess: (data: IProduct[]) => void) => {
    return useMutation({
        mutationKey: [QUERY_KEY.GET_FILTER_PRODUCT],
        mutationFn: fetcher,
        onSuccess: (data) => {
            onSuccess && onSuccess(data.data)
        }
    })
}