import HttpRequest from "@/utils/HttpRequest"
export interface ISingIn {
    email: string;
    password: string;
}
export const SingInService = {
    singin: async (data: ISingIn) => {
        const res = await HttpRequest.post('singin', data)
        return res.data
    }
}