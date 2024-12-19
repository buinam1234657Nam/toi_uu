import express from "express"
import productController from "../controller/product.controller"
const routerProduct = express.Router()

routerProduct.get("/", productController.getAllProduct)
routerProduct.get("/new", productController.getProductNew)
routerProduct.get("/sale", productController.getProductSale)
routerProduct.get("/discount", productController.getProductDiscount)
routerProduct.get("/search", productController.getFilterProduct)
routerProduct.get("/category", productController.getProductByCategory)
routerProduct.get("/:id", productController.getProductById)

routerProduct.post("/", productController.createProduct)
routerProduct.put("/:id", productController.updateProduct)
routerProduct.delete("/:id", productController.deleteProduct)

export default routerProduct