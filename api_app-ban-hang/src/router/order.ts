import express from "express"
import orderController from "../controller/order.controller"
const routerOrder = express.Router()
routerOrder.post("/", orderController.createOrder)
routerOrder.get("/:userId", orderController.getOrder)
routerOrder.get("/", orderController.getAllOrder)
routerOrder.put("/location/:orderId", orderController.getLocationShipper)
routerOrder.put("/", orderController.updateOrder)
routerOrder.delete("/:orderId", orderController.deleteOrder)
routerOrder.get("/orderByOrderId/:id", orderController.getOrderById)
export default routerOrder