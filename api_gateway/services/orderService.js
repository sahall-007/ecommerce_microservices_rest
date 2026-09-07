import { orderService } from "../config/services.js"
import axios from 'axios'

export const createOrder = async (data) => {
    const response = await axios.post(`${orderService}/createOrder`, data)

    return response.data
}

export const getOrders = async (userId) => {
    const response  = await axios.post(`${orderService}/getOrders`, { userId })

    return response.data
}