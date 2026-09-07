import { asyncHandler } from "../utils/async.handler.js"
import { HTTP_STATUS } from "../constants/http.status.code.js"
import * as ProductService from '../services/productService.js'

// export const addProduct = asyncHandler(async (req, res) => {
//     const { name, colour, category, description, price, quantity, city, state } = req.body
//     const { id } = req.user

//     // const imagePaths = req.files.map(file => file.path)
//     const imageFiles = req.files.map(
//         file => `/uploads/${file.filename}`
//     );

//     const result = await ProductService.addProduct(req.body, imageFiles, id)

//     res.status(HTTP_STATUS.OK).json({
//         success: true,
//         data: result
//     })

// })

export const getProducts = asyncHandler(async (req, res) => {
    const products = await ProductService.getProducts()

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: products
    })
})

// export const getProduct = asyncHandler(async (req, res) => {
//     const { productId } = req.params
//     const product = await ProductService.getProduct(productId)

//     res.status(HTTP_STATUS.OK).json({
//         success: true,
//         data: product
//     })
// })



// here we are taking the user id from the jwt so we need to update here
export const getMyProducts = asyncHandler(async (req, res) => {
    const { id } = req.user
    const products = await ProductService.getMyProducts(id)

    res.status(HTTP_STATUS.OK).json(products)
})

export const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const result = await ProductService.deleteProduct(productId)

    res.status(HTTP_STATUS.OK).json(result)
})

export const productDetail = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await ProductService.productDetail(id)

    res.status(HTTP_STATUS.OK).json(result)
})