import { forgotPassWord } from "../service/forgot.service"
import express from "express"
const routerForgotPassword = express.Router()
routerForgotPassword.post("/", forgotPassWord)
export default routerForgotPassword