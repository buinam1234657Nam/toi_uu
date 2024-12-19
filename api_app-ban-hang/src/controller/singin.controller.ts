import { Request, Response } from "express"
import singinService from "../service/singin.service"
import { HttpStatusCode } from "axios"
const singin = async (req: Request, res: Response) => {
    try {
        const result = await singinService.singin(req.body)
        res.status(HttpStatusCode.Created).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
        return res.status(HttpStatusCode.InternalServerError).json({ message: "Đã xảy ra bên phía server" })
    }
}
export default {
    singin,
}