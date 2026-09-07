import { productService } from "../config/services.js"
import axios from 'axios'
import { config } from 'dotenv'

config()

// export const addProduct = async (reqBody, images, userId) => {

//     const { name, colour, category, description, price, quantity, city, state } = reqBody

//     const result = await ProductSchema.insertOne({
//         name, 
//         price,
//         quantity,
//         colour,
//         category,
//         description,
//         city,
//         state,
//         image: images,
//         userId
//     })

//     return result
// }

export const getProducts = async () => {
    const response = await axios.post(`${productService}/getProducts`)    

    return response.data
}

// export const getProduct = async (id) => {
//     const product = await ProductSchema.findOne({_id: id})

//     return product
// }

export const getMyProducts = async (userId) => {
    const response = await axios.post(`${productService}/getMyProducts/${userId}`)    

    return response.data
}

export const deleteProduct = async (productId) => {
    const response = await axios.delete(`${productService}/deleteProduct/${productId}`)    

    return response.data
}

export const productDetail = async (id) => {
    const response = await axios.get(`${productService}/productDetail/${id}`)    

    return response.data
}
