import { Router } from "express"
import * as UserController from '../controllers/userController.js'
import { auth } from "../middlewares/authMiddleware.js"

const router = Router()

router.post('/login', UserController.login)

router.post('/register', UserController.register)

router.post('/logout', UserController.logout)

router.post('/getMe', auth, UserController.getMe)

// router.get('/getUser/:userId', UserController.getUser)

router.post('/createAddress', auth, UserController.createAddress)

router.post('/getAddress', auth, UserController.getAddress)

export default router