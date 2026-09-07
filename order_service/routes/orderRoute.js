import { Router } from "express"
import * as OrderController from '../controllers/orderController.js'

const router = Router()

router.post('/createOrder', OrderController.createOrder)

router.post('/getOrders', OrderController.getOrders)

export default router