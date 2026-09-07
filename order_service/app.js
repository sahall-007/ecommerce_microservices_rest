import express from 'express'
import { config } from 'dotenv'
import { errorHandler } from './middlewares/error.middleware.js'
import orderRoute from './routes/orderRoute.js'
import { connectProducer } from './kafka/producer/order.producer.js'
import connectDb from './config/mongoDb.js'
import { createTopic } from './kafka/admin.js'

config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/order', orderRoute)
app.use(errorHandler)

const startServer = async () => {
    await connectDb()
    await createTopic()
    await connectProducer()
    app.listen(process.env.PORT, () => {
        console.log(`listening to port: ${process.env.PORT}`)
    })
}

startServer()
