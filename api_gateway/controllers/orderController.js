import { asyncHandler } from "../utils/async.handler.js"
import { HTTP_STATUS } from "../constants/http.status.code.js"
import * as OrderService from '../services/orderService.js'

export const createOrder = asyncHandler(async (req, res) => {
    const result = await OrderService.createOrder(req.body)

    res.status(HTTP_STATUS.OK).json(result)
})

export const getOrders = asyncHandler(async (req, res) => {
    const result = await OrderService.getOrders(req.body.userId)

    res.status(HTTP_STATUS.OK).json(result)
})