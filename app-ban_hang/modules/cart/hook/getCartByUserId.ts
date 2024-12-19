import { QUERY_KEY } from "@/constants/queryKey"
import HttpRequest from "@/utils/HttpRequest"
import { useQuery } from "@tanstack/react-query"
import { ICart } from "../../../../api_app-ban-hang/src/model/cart.model"

const fetcher = async (userID: string) => {
    const res = await HttpRequest.get<ICart>(`cart/${userID}`)
    return res
}
export const useGetCartByUserId = (userID: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_CART_BY_USER_ID, userID],
        queryFn: () => fetcher(userID),
        select: (data) => data.data,
        enabled: !!userID,
        refetchInterval: 10000,
    })
}