import OrderSchema from '../models/orderSchema.js'
import { config } from 'dotenv'
import { publishOrderCreated } from '../kafka/producer/order.producer.js'

config()

export const createOrder = async (data) => {

    console.log('This is order creating object', data)

    const addressResponse = await fetch(`${process.env.USER_SERVICE_URL}/getAddressForOrder/${data.address}`)    
    const productsResponse = await fetch(`${process.env.PRODUCT_SERVICE_URL}/getProductsForOrder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({productIds: data.products})
    })

    const address = await addressResponse.json()
    const products = await productsResponse.json()

    const response = await OrderSchema.insertOne({...data, address: address.data, products: products.data, status: 'pending'})
    if(response){
        // await CartSchema.deleteMany({userId: data.userId})
        await publishOrderCreated(response)
        // const deleteResponse = await fetch(`${process.env.CART_SERVICE_URL}/deleteCart/${data.userId}`)
        // const result = await deleteResponse.json()

        // if(!result?.success) throw new AppError('Failed to delete cart', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return response
}

export const getOrders = async (userId) => {
    console.log('get orders service')
    // const response = await OrderSchema.find({userId}).populate('address').populate('products')
    const response = await OrderSchema.find({userId})

    // const addressResponse = await fetch(`${process.env.USER_SERVICE_URL}/getAddress`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({userId})
    // })
    // const { data } = await addressResponse.json()

    return response
}