import { Router } from "express"
import * as CartController from '../controllers/cartController.js'
import { auth } from "../middlewares/authMiddleware.js"

const router = Router()

router.post('/addToCart/:productId', auth, CartController.adddToCart)

router.post('/getCart', auth, CartController.getCart)

router.post('/changeQuantity', auth, CartController.changeQuantity)

router.delete('/deleteItem/:cartId', auth, CartController.deleteItem)

// router.delete('/deleteCart/:userId', CartController.deleteCart)


export default router