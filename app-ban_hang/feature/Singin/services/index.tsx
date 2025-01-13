import HttpRequest from "@/utils/HttpRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface ISingIn {
  email: string;
  password: string;
}
interface ISingInBioometric{
  infoDevice?: string;
}
export const SingInService = {
  singin: async (data: ISingIn | ISingInBioometric) => {
    const res = await HttpRequest.post("singin", data);
    return res.data;
  },
  refreshToken: async () => {
    const refresh_token = await AsyncStorage.getItem("refresh_token");
    if (!refresh_token) {
      throw new Error("No refresh token found");
    }
    const res = await HttpRequest.post("/singin/refresh_token", {
      refresh_token,
    });
    const { access_token } = res.data;
    const newToken = access_token
    return newToken;
  },
};
