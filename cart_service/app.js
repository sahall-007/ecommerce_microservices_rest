import express from 'express'
import { config } from 'dotenv'
import { errorHandler } from './middlewares/error.middleware.js'
import cartRoute from './routes/cartRoute.js'
import { connectProducer } from './kafka/producer/cart.producer.js'
import { startOrderConsumer } from './kafka/consumer/order.consumer.js'
import connectDb from './config/mongoDb.js'

config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/cart', cartRoute)
app.use(errorHandler)

const startServer = async () => {
    await connectDb()
    await connectProducer()
    try{
        await startOrderConsumer()
    }
    catch(err){
        console.log('connect consumer error', err)
    }
    

    app.listen(process.env.PORT, () => {
        console.log(`listening to port: ${process.env.PORT}`)
    })
}

startServer()