import { AnyElement } from '@/constants';
import { AlertTypes, Notification } from "@/components/Notification"
import { IUpdateAccount } from "@/types"
import HttpRequest from "@/utils/HttpRequest"
import { useMutation } from "@tanstack/react-query"

const fetcher = async (account: IUpdateAccount) => {
    const res = await HttpRequest.put(`/user/${account._id}`, account)
    return res
}
const useUpdateAccount = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: (account: IUpdateAccount) => fetcher(account),
        onSuccess: () => {
            Notification({
                description: "Cập nhật tài khoản thành công",
                alertType: AlertTypes.SUCCESS
            })
            onSuccess && onSuccess()
        },
        onError(error: AnyElement) {
            console.log(error)
            Notification({
                description: error.response.data.message,
                alertType: AlertTypes.ERROR
            })
        },
    })
}
export default useUpdateAccount