import { Router } from "express"
import * as CartController from '../controllers/cartController.js'

const router = Router()

router.post('/addToCart', CartController.adddToCart)

router.post('/getCart', CartController.getCart)

router.patch('/changeQuantity', CartController.changeQuantity)

router.delete('/deleteItem/:cartId', CartController.deleteItem)

router.delete('/deleteCart/:userId', CartController.deleteCart)


export default router