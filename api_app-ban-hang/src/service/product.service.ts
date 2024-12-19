import Product, { IProduct } from "../model/product.model"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../types"
// get all product
const getAllProduct = async () => {
    try {
        const res = await Product.paginate({})
        return res
    } catch (error) {
        console.log(error)
        throw Error(error as string)
    }
}
// get product by id
const getProductById = async (id: string) => {
    try {
        const res = await Product.findById(id)
        return res
    } catch (error) {
        console.log(error)
        throw Error(error as string)
    }
}
// get product by category
const getProductByCategory = async (type: number) => {
    try {
        const res = await Product.find({
            type: type
        })
        return res
    } catch (error) {
        console.log(error)
        throw Error(error as string)
    }
}
// get filter product
const getFilterProduct = async (searchTerm: string) => {
    try {
        const res = await Product.find({
            name: { $regex: searchTerm, $options: 'i' },
        })
        return res
    } catch (error) {
        console.log(error)
        throw new Error("Error searching products")
    }
}
//  get product new
const getProductNew = async (page: number = DEFAULT_PAGE, limit: number = DEFAULT_LIMIT) => {
    try {
        const res = await Product.paginate({}, { sort: { createdAt: -1 }, page, limit });
        return res
    } catch (error) {
        console.log(error)
        throw Error(error as string)
    }
}
// get product sale
const getProductSale = async (page: number = DEFAULT_PAGE, limit: number = DEFAULT_LIMIT) => {
    try {
        const res = await Product.paginate({}, { sort: { quantity_sales: -1 }, page, limit })
        return res
    } catch (error) {
        console.log(error)
        throw Error(error as string)
    }
}
// get product discount
const getProductDiscount = async (page: number = DEFAULT_PAGE, limit: number = DEFAULT_LIMIT) => {
    try {
        const res = await Product.paginate({}, { sort: { sale_price: -1 }, page, limit })
        return res
    } catch (error) {
        console.log(error)
        throw Error(error as string)
    }
}
// create product
const createProduct = async (data: IProduct) => {
    try {
        const res = await Product.create(data)
        return res
    } catch (error) {
        console.log(error)
        throw Error(error as string)
    }
}
// update product
const updateProduct = async (id: string, data: any) => {
    try {
        const res = await Product.findByIdAndUpdate(id, data)
        return res
    } catch (error) {
        console.log(error)
        throw Error(error as string)
    }
}
// delete product
const deleteProduct = async (id: string) => {
    try {
        const res = await Product.findByIdAndDelete({ _id: id })
        return res
    } catch (error) {
        console.log(error)
        throw Error(error as string)
    }
}
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