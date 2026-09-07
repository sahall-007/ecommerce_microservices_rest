import { Types } from 'mongoose'
import { EVENTS } from '../constants/event.constants.js'
import ProductSchema from '../models/productScema.js'
import { config } from 'dotenv'

config()

export const addProduct = async (reqBody, images, userId) => {

    const { name, colour, category, description, price, quantity, city, state } = reqBody

    const result = await ProductSchema.insertOne({
        name, 
        price,
        quantity,
        colour,
        category,
        description,
        city,
        state,
        image: images,
        userId
    })

    return result
}

export const getProducts = async () => {
    const products = await ProductSchema.find()

    return products
}

export const getProduct = async (id) => {
    const product = await ProductSchema.findOne({_id: id})

    return product
}

export const getMyProducts = async (userId) => {
    const products = await ProductSchema.find({userId})

    return products
}

export const deleteProduct = async (productId) => {
    const deleteProduct = await ProductSchema.deleteOne({_id: productId})

    const response = await ProductSchema.find()

    return response
}

export const productDetail = async (id) => {
    const product = await ProductSchema.findOne({_id: new Types.ObjectId(id)})
    
    const response = await fetch(`${process.env.USER_SERVICE_URL}/getUser/${product.userId}`)
    const result = await response.json()

    console.log({...product, email: result.user.email})

    return {...product, email: result.user.email}
}

export const handleCartEvent = async (event) => {
    if(event.eventType == EVENTS.CART_DELETED){
        const { productIds } = event.data

        const bulkOp = productIds.map(ele => {

            return {updateOne: {
                filter: {_id: ele},
                update: {$inc: {quantity: -1}}
            }}
        })

        const result = await ProductSchema.bulkWrite(bulkOp)
    }
}

export const getProductsForOrder = async (productIds) => {
    const products = await ProductSchema.find({_id: {$in: productIds}})

    return products
}