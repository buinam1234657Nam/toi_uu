import { useMutation } from "@tanstack/react-query";
import { SingInService } from "../services";
import { AnyElement } from "@/constants";
import { AlertTypes, Notification } from "@/components/Notification";
import { IUser } from "@/types";
import { appStore } from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const useSingIn = (onSuccess: () => void) => {
  const { setUserInfo } = appStore();
  return useMutation({
    mutationFn: SingInService.singin,
    onSuccess: (
      data: IUser & { access_token: string; refresh_token: string }
    ) => {
      onSuccess && onSuccess();
      setUserInfo(data);
      //localStorage.setItem("access_token", data.access_token);
     // localStorage.setItem("refresh_token", data.refresh_token);
      AsyncStorage.setItem("access_token", data.access_token);
      AsyncStorage.setItem("refresh_token", data.refresh_token);
    },
    onError(error: AnyElement) {
      console.log(error);
      Notification({
        description: error.response.data.message,
        alertType: AlertTypes.ERROR,
      });
    },
  });
};
