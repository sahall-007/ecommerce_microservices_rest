import { Router } from "express"
import * as OrderController from '../controllers/orderController.js'
import { auth } from "../middlewares/authMiddleware.js"

const router = Router()

router.post('/createOrder', auth, OrderController.createOrder)

router.post('/getOrders', auth, OrderController.getOrders)

export default router