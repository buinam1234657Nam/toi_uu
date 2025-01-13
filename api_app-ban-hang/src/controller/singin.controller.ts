import { Request, Response } from "express";
import signinService from "../service/singin.service";
import { HttpStatusCode } from "axios";

const singin = async (req: Request, res: Response) => {
    try {
        const result = await signinService.signin(req.body);
        res.status(HttpStatusCode.Created).json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message });
        }
        return res.status(HttpStatusCode.InternalServerError).json({ message: "Thông tin tài khoản không chính xác" });
    }
};

const refreshToken = async (req: Request, res: Response) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
        return res.status(HttpStatusCode.BadRequest).json({ message: "Refresh token is required" });
    }

    try {
        const result = await signinService.refreshAccessToken(refresh_token);
        res.status(HttpStatusCode.Ok).json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
        }
        return res.status(HttpStatusCode.InternalServerError).json({ message: "Failed to refresh token" });
    }
};

export default {
    singin,
    refreshToken,
};
