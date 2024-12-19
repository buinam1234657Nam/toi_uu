import express from "express"
import cartController from "../controller/cart.controller"
const routerCart = express.Router()
routerCart.get("/:userId", cartController.getCartByUserId)
routerCart.post("/", cartController.createCart)
routerCart.put("/", cartController.updateCart)
routerCart.delete("/", cartController.deleteProductInCart)
routerCart.delete("/:userId", cartController.deleteCart)
export default routerCart