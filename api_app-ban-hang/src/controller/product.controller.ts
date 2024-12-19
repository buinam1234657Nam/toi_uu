import { Request, Response } from "express"
import { HttpStatusCode } from "axios"
import productService from "../service/product.service"
//  get all product
const getAllProduct = async (req: Request, res: Response) => {
    try {
        const result = await productService.getAllProduct()
        res.status(HttpStatusCode.Created).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
        return res.status(HttpStatusCode.InternalServerError).json({ message: "Đã xảy ra bên phía server" })
    }
}
// get product by id
const getProductById = async (req: Request, res: Response) => {
    try {
        const result = await productService.getProductById(req.params.id)
        res.status(HttpStatusCode.Created).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
    }
}
// get product by category
const getProductByCategory = async (req: Request, res: Response) => {
    try {
        const type = req.query.type as string
        if (!type) {
            return res.status(HttpStatusCode.BadRequest).json({ message: "Type  is required" })
        }
        const result = await productService.getProductByCategory(Number(type))
        res.status(HttpStatusCode.Created).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
    }
}
// get filter product
const getFilterProduct = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.q as string
        if (!searchTerm) {
            return res.status(HttpStatusCode.BadRequest).json({ message: "Search term is required" })
        }
        const result = await productService.getFilterProduct(searchTerm)
        res.status(HttpStatusCode.Ok).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
        return res.status(HttpStatusCode.InternalServerError).json({ message: "Đã xảy ra lỗi bên phía server" })
    }
}
// get product moi nhat
const getProductNew = async (req: Request, res: Response) => {
    const page = req.query.page as string
    const limit = req.query.limit as string
    try {
        const result = await productService.getProductNew(Number(page), Number(limit))
        res.status(HttpStatusCode.Created).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
    }
}
// get product ban chay nhat
const getProductSale = async (req: Request, res: Response) => {
    const page = req.query.page as string
    const limit = req.query.limit as string
    try {
        const result = await productService.getProductSale(Number(page), Number(limit))
        res.status(HttpStatusCode.Created).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
    }
}
// get product dang gianm gia
const getProductDiscount = async (req: Request, res: Response) => {
    const page = req.query.page as string
    const limit = req.query.limit as string
    try {
        const result = await productService.getProductDiscount(Number(page), Number(limit))
        res.status(HttpStatusCode.Created).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
    }
}
// create product
const createProduct = async (req: Request, res: Response) => {
    try {
        const result = await productService.createProduct(req.body)
        res.status(HttpStatusCode.Created).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
    }
}
// update product
const updateProduct = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const result = await productService.updateProduct(id, req.body)
        res.status(HttpStatusCode.Created).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
    }
}
// delete product
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const result = await productService.deleteProduct(req.params.id)
        res.status(HttpStatusCode.Created).json(result)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(HttpStatusCode.BadRequest).json({ message: error.message })
        }
    }
}
//  dang giam gia
export default {
    getAllProduct,
    getProductById,
    getProductByCategory,
    getFilterProduct,
    getProductNew,
    getProductSale,
    getProductDiscount,
    createProduct,
    updateProduct,
    deleteProduct,
}