import express from 'express'
import { config } from 'dotenv'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)
app.use('/order', orderRoute)

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})