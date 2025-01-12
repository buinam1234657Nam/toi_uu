const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

import { NextFunction, Request, Response } from "express";

const publicKey = fs.readFileSync(process.env.PUBLIC_KEY, "utf8");

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(404).json({ message: "Token is required" });
        }
    
        jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err: any, payload: any) => {
            if (err) {
                return res.status(401).json({ message: "Token is invalid or expired" });
            }
            next();
        });
    } catch (error) {
        console.error("Error in verifyToken:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default verifyToken;
