import express from "express"
import singinController from "../controller/singin.controller"
const routerSingin = express.Router()
routerSingin.post("/", singinController.singin)
routerSingin.post("/refresh_token", singinController.refreshToken)
export default routerSingin