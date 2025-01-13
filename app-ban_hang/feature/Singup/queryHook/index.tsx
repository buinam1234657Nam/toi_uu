import { useMutation } from "@tanstack/react-query";
import { SingUpService } from "../services";
import { AlertTypes, Notification } from "@/components/Notification";
import { AnyElement } from "@/constants";
export const useCreateUser = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: SingUpService.singUp,
        onSuccess: () => {
            Notification({
                description:"Đăng ký thành công",
                alertType: AlertTypes.SUCCESS
            })
            onSuccess && onSuccess()
        },
        onError(error: AnyElement) {
            Notification({
                description: error.response.data.message,
                alertType: AlertTypes.ERROR
            })
        },
    });
};
