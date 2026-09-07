import { asyncHandler } from "../utils/async.handler.js"
import { HTTP_STATUS } from "../constants/http.status.code.js"
import * as CartService from '../services/cartService.js'

export const adddToCart = asyncHandler(async (req, res) => {
    const { productId, userId } = req.body
    const result = await CartService.adddToCart(productId, userId)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
})

export const getCart = asyncHandler(async (req, res) => {
    const { userId } = req.body
    const result = await CartService.getCart(userId)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
})

export const changeQuantity = asyncHandler(async (req, res) => {
    const { cartId, change } = req.body
    const result = await CartService.changeQuantity(cartId, change)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
})

export const deleteItem = asyncHandler(async (req, res) => {
    const { cartId } = req.params
    const result = await CartService.deleteItem(cartId)

    res.status(HTTP_STATUS.OK).json({
        success: true,        
    })
})

export const deleteCart = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const result = await CartService.deleteCart(userId)

    res.status(HTTP_STATUS.OK).json({
        success: true,        
    })
})