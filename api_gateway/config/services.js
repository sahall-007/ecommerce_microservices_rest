import  {config } from "dotenv"

config()

export const userService = process.env.USER_SERVICE_URL
export const productService = process.env.PRODUCT_SERVICE_URL
export const cartService = process.env.CART_SERVICE_URL
export const orderService = process.env.ORDER_SERVICE_URL