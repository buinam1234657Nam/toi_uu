import HttpRequest from "@/utils/HttpRequest"

export const forgotService = {
    forgotPassWord: async (data: any) => {
        const res = await HttpRequest.post('forgot-password', data)
        return res.data
    }
}