import axios, { AxiosInstance } from "axios";
import { apiOrigin } from "@/constants/index";
const Http = (): AxiosInstance => {
    return axios.create({
        baseURL: `${apiOrigin}/`,
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
        }
    });
};

const HttpRequest = Http();
export default HttpRequest