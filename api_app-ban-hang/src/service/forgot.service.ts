import User from "../model/user.model";
import crypto from 'crypto';
import { Request, Response } from 'express';
const MJ_APIKEY_PUBLIC = "f9a5786c6ffc05d15e6f8215913416cd";
const MJ_APIKEY_PRIVATE = "e6aec2fea3c2de64795aeaf4cd7781b8";

function generatePass(length: number = 10): string {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
}

export const forgotPassWord = async (req: Request, res: Response) => {
    const email = req.body.email;

    const mailjet = require('node-mailjet').apiConnect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);

    try {
        const user = await User.findOne({ email });

        if (user) {
            const newPass = generatePass();
            user.password = newPass;
            user.confirmPassword = newPass;
            await user.save();

            await mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: "thaibinhbuiduc@gmail.com",
                            Name: "Juno Shop"
                        },
                        To: [
                            {
                                Email: email,
                                Name: email
                            }
                        ],
                        Subject: "Your new password",
                        HTMLPart: `<h3>Your new password is <span style="color:blue">${newPass}</span></h3> <br/><h3>Please change your password after successful login.</h3>`
                    }
                ]
            });

            res.json({
                success: true,
                message: "Password reset successfully. Check your email for the new password."
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Email does not exist"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
