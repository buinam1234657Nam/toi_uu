const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY);
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY);

export const genneralAccessToken = async (payload: any) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        privateKey,
        {
            algorithm: "RS256",
            expiresIn: "30s",
        }
    );

    return access_token;
};

export const genneralRefreshToken = async (payload: any) => {
    const refresh_token = jwt.sign(
        {
            ...payload,
        },
        privateKey,
        {
            algorithm: "RS256",
            expiresIn: "30d",
        }
    );

    return refresh_token;
};

export const refreshTokenJwtService = (token: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, publicKey, async (err: any, user: any) => {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        return resolve({
                            status: "ERR",
                            message: "Refresh token has expired",
                        });
                    }
                    return resolve({
                        status: "ERR",
                        message: "The authentication failed",
                    });
                }

                // Tạo access token mới
                const access_token = await genneralAccessToken({
                    id: user?.id,
                });

                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    access_token,
                });
            });
        } catch (e) {
            reject({
                status: "ERR",
                message: "An error occurred during token refresh",
            });
        }
    });
};
