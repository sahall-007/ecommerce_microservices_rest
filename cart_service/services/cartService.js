import CartSchema from '../models/cartSchema.js'
import { EVENTS } from '../constants/event.constants.js'
import { publishCartDeleted } from '../kafka/producer/cart.producer.js'

export const adddToCart = async (productId, userId) => {
    console.log('======================= add to cart =======================')
    // const product = await ProductSchema.findOne({_id: new Types.ObjectId(productId)})
    const response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/getProduct/${productId}`)
    const result = await response.json()

    const {_id, name, price, city, state, image} = result.data

    const cartProduct = await CartSchema.findOne({userId: userId, productId: _id})

    if(cartProduct){        
        if(cartProduct.quantity >= 5) return false
        return await CartSchema.findByIdAndUpdate({_id: cartProduct._id}, {$inc: {quantity: 1}})
    }

    const cart = await CartSchema.insertOne({
        userId,
        productId,
        name,
        price,
        quantity: 1,
        city,
        state,
        image: image[0]
    })

    return cart
}

export const getCart = async (userId) => {
    const result = await CartSchema.find({userId})

    return result
}

export const changeQuantity = async (cartId, change) => {
    const result = await CartSchema.findByIdAndUpdate(cartId, {$inc: {quantity: change}}, {new: true})
    // const newCart = await CartSchema.findOne({_id: cartId})

    return result?.quantity
}

export const deleteItem = async (cartId) => {
    const result = await CartSchema.findByIdAndDelete(cartId)

    return true
}

export const deleteCart = async (userId) => {
    const response = await CartSchema.find({userId}, {productId: 1})
    const products = response.map(ele => ele.productId)
    
    await CartSchema.deleteMany({userId})

    return products
}

export const handleOrderEvent = async (event) => {
    if(event.eventType == EVENTS.ORDER_CREATED){
        const result = await deleteCart(event.data.userId)

        await publishCartDeleted(result)
    }    
}