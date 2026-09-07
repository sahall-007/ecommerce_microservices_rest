import express from 'express'
import { config } from 'dotenv'
import { errorHandler } from './middlewares/error.middleware.js'
import productRoute from './routes/productRoute.js'
import path from 'path'
import { startCartConsumer } from './kafka/consumer/cart.consumer.js'
import connectDb from './config/mongoDb.js'

config()

const app = express()

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/product', productRoute)
app.use(errorHandler)

const startServer = async () => {
    await connectDb()
    // try {
        await startCartConsumer()
    // } catch (error) {
    //     console.error('Kafka consumer failed:', error)
    // }

    app.listen(process.env.PORT, () => {
        console.log(`listening to port: ${process.env.PORT}`)
    })
}

startServer()