import { useMutation } from "@tanstack/react-query"
import { forgotService } from "../services"
import { AlertTypes, Notification } from "@/components/Notification"
import { AnyElement } from "@/constants"
export const useForgotPassword = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: forgotService.forgotPassWord,
        onSuccess: (data) => {
            if (data.success) {
                onSuccess && onSuccess()
                Notification({
                    description: "Please check your email",
                    alertType: AlertTypes.SUCCESS
                })
            }
            else {
                Notification({
                    description: "Email does not exist",
                    alertType: AlertTypes.ERROR
                })
            }
        },
        onError(error: AnyElement) {
            Notification({
                description: error.response.data.message,
                alertType: AlertTypes.ERROR
            })
        },
    })
}