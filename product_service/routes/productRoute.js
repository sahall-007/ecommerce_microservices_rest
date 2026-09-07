import { Router } from "express"
import { upload } from "../middlewares/multer.js"
import * as ProductController from '../controllers/productController.js'

const router = Router()

router.post('/addProduct', upload.array("images", 10), ProductController.addProduct)

router.post('/getProducts', ProductController.getProducts)

router.get('/getProduct/:productId', ProductController.getProduct)

router.post('/getMyProducts/:userId', ProductController.getMyProducts)

router.delete('/deleteProduct/:productId', ProductController.deleteProduct)

router.get('/productDetail/:id', ProductController.productDetail)

router.post('/getProductsForOrder', ProductController.getProductsForOrder)

export default router