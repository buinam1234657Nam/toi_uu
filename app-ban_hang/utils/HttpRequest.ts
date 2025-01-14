import axios, { AxiosInstance } from "axios";
import { apiOrigin } from "@/constants/index";
const Http = (): AxiosInstance => {
    return axios.create({
        baseURL: `${apiOrigin}/`,
        timeout: 20000,
        headers: {
            "Content-Type": "application/json",
        }
    });
};

const HttpRequest = Http();
export default HttpRequest
export const isJsonString = (data: any) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}