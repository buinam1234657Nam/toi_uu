import HttpRequest from "@/utils/HttpRequest"
import { ISingUp } from "../types"

export const SingUpService = {
    singUp: async (data: ISingUp) => {
        const res = await HttpRequest.post('user', data)
        return res.data
    }
}