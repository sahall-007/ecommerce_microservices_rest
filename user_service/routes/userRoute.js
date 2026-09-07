import { Router } from "express"
import * as UserController from '../controllers/userController.js'

const router = Router()

router.post('/login', UserController.login)

router.post('/register', UserController.register)

router.post('/logout', UserController.logout)

router.get('/getMe/:userId', UserController.getMe)

router.get('/getUser/:userId', UserController.getUser)

router.post('/createAddress', UserController.createAddress)

router.post('/getAddress', UserController.getAddress)

router.get('/getAddressForOrder/:addressId', UserController.getAddressForOrder)

export default router