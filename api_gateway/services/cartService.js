import { cartService } from "../config/services.js"
import axios from 'axios'

export const adddToCart = async (productId, userId) => {
    const response = await axios.post(`${cartService}/addToCart`, {productId, userId})
    return response.data
}

export const getCart = async (userId) => {
    const response = await axios.post(`${cartService}/getCart`, { userId })

    return response.data
}

export const changeQuantity = async (cartId, change) => {
    const response = await axios.post(`${cartService}/changeQuantity`, { cartId, change })

    return response.data
}

export const deleteItem = async (cartId) => {
    const response = await axios.delete(`${cartService}/deleteItem/${cartId}`)

    return response.data
}

export const deleteCart = async (userId) => {
    const result = await CartSchema.deleteMany({userId})

    return true
}