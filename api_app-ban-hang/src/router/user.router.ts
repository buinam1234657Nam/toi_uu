import express from "express"
import userController from "../controller/user.controller"
const routerUsers = express.Router()
// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function (req: Request, file: any, cb: any) {
//         cb(null, "./uploads");
//     },
//     filename: function (req: Request, file: any, cb: any) {
//         const uniqueSuffix = Date.now();      
//         cb(null, uniqueSuffix + "-" + file.originalname);
//     },
// });
// const upload = multer({ storage: storage });
// routerUsers.post("/", upload.any(), (req: any, res: Response, next) => {
//     const avatar = req.files[0]?.path ? req.files[0]?.path : ""
//     req.body = { ...req.body, avatar }
//     next()
// }, userController.createUser)
// export default routerUsers
routerUsers.post("/", userController.createUser)
routerUsers.get("/", userController.getUsersAll)
routerUsers.get("/:id", userController.getUserDetail)
routerUsers.put("/:id", userController.updateUser)
routerUsers.delete("/:id", userController.deleteUser)
export default routerUsers