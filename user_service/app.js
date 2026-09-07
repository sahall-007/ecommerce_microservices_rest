import express from 'express'
import { config } from 'dotenv'
import { errorHandler } from './middlewares/error.middleware.js'
import userRoute from './routes/userRoute.js'
import connectDb from './config/mongoDb.js'

config()

connectDb()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', userRoute)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`listening to port: ${process.env.PORT}`)
})