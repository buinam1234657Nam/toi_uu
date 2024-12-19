import { Request, Response } from "express";
import userService from "../service/user.service";
import { HttpStatusCode } from "axios";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body);
        res.status(HttpStatusCode.Created).json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message });
        }
        return res.status(HttpStatusCode.InternalServerError).json({ message: "Đã xảy ra lỗi không xác định" });
    }
}
const getUsersAll = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUsersAll();
        res.status(HttpStatusCode.Ok).json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message });
        }
    }
}
const getUserDetail = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUserDetail(req.params.id);
        res.status(HttpStatusCode.Ok).json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message });
        }
    }
}
const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.updateUser(req.body);
        res.status(HttpStatusCode.Ok).json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
    }
}
const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.status(HttpStatusCode.Ok).json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message });
        }
    }
}
export default {
    createUser,
    getUsersAll,
    getUserDetail,
    updateUser,
    deleteUser
}