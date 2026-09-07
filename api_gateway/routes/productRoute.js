import { Router } from "express"
import { productService } from "../config/services.js"
import * as ProductController from '../controllers/productController.js'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { auth } from "../middlewares/authMiddleware.js"

const router = Router()

// router.post('/addProduct', upload.array("images", 10), ProductController.addProduct)

// we are using this createproxymiddleware because in the /addProduct endpoint we are getting a multipart form data 
// so there will be images for this endpoint and we cannot send that to the product_service without processing
// those images in the api_gateway, that means we will have to have multer configured in the api_gateway
// To solve this we use createProxyMidlleware to forward the reqeust directly to the product service without letting
// the api gateway handle this specific request, the response will be send to front end from product_service through this proxy/middleware
// pathRewrite is for matching with the end point we put on the product_service, since product_service also has the same endpoint
// as the api_gateway (/product/addProduct) we dont have to use pathRewrite, if our product_service endpoint is just /addproduct
// then using pathRewrite: {"^/product": ""} will remove the /product from from the request that came to the api_gateway to match with the 
// product_service endpoint
router.post('/addProduct', auth, createProxyMiddleware({
    target: productService,
    changeOrigin: true,
    // pathRewrite: {
    //     "^/product": ""
    // }
}))

router.post('/getProducts', ProductController.getProducts)

// router.get('/getProduct/:productId', ProductController.getProduct)

router.post('/getMyProducts', auth, ProductController.getMyProducts)

router.delete('/deleteProduct/:productId', auth, ProductController.deleteProduct)

router.get('/productDetail/:id', ProductController.productDetail)

export default router