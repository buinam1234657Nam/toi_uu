import { QUERY_KEY } from "@/constants/queryKey"
import { appStore } from "@/store"
import HttpRequest from "@/utils/HttpRequest"
import { useMutation } from "@tanstack/react-query"

const fetcher = async (id: string) => {
    const res = await HttpRequest.get(`user/${id}`)
    return res
}
const useGetUserDetail = () => {
    const { setUserInfo } = appStore()
    return useMutation({
        mutationKey: [QUERY_KEY.GET_USER_DETAIL],
        mutationFn: fetcher,
        onSuccess: (data) => {
            setUserInfo(data.data)

        }
    })
}
export default useGetUserDetail