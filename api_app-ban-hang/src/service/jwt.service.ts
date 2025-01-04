const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

export const genneralAccessToken = async (payload: any) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "10s" }
    );

    return access_token;
};

export const genneralRefreshToken = async (payload: any) => {
    const refresh_token = jwt.sign(
        {
            ...payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "30d" }
    );

    return refresh_token;
};

export const refreshTokenJwtService = (token: string) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err: any, user: any) => {
                console.log(user);
                if (err) {
                    console.log(err),
                        resolve({
                            status: "ERR",
                            message: "The authemtication",
                        });
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                });
                resolve({
                    status: "OK",
                    message: "SUCESS",
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

