import express from 'express'
import { config } from 'dotenv'
import { errorHandler } from './middlewares/error.middleware.js'
import userRoute from './routes/userRoute.js'

config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', userRoute)
app.use(errorHandler)

export default app