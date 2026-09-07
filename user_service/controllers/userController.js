import { asyncHandler } from "../utils/async.handler.js"
import { HTTP_STATUS } from "../constants/http.status.code.js"
import * as UserService from '../services/userService.js'

export const login = asyncHandler(async (req, res) => {
    console.log('================= login controller ================')
    const { email, password } = req.body
    const result = await UserService.login(email, password)
    const { accessToken, user } = result

    // res.cookie('accessToken', accessToken, {
    //     httpOnly: true,
    //     maxAge: 7 * 24 * 60 * 60 * 1000
    // })

    res.status(HTTP_STATUS.OK).json({
        success: true,
        accessToken,
        user
    })
})

export const register = asyncHandler(async (req, res) => {
    console.log('============== register controller ============')
    const { email, password } = req.body
    const registerUser = await UserService.register(email, password)
    const { accessToken, user } = registerUser

    // res.cookie('accessToken', accessToken, {
    //     httpOnly: true,
    //     // strict: true,   
    //     // sameSite: 'strict',
    //     maxAge: 7 * 24 * 60 * 60 * 1000
    // })

    res.status(HTTP_STATUS.OK).json({
        success: true,
        accessToken,
        user
    })    
})

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie('accessToken')
    res.status(HTTP_STATUS.OK).json({ success: true, message: 'cookie cleared, logged out' })
})

export const getMe = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const result = await UserService.getMe(userId)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        user: result
    })
})

export const getUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const result = await UserService.getMe(userId)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        user: result
    })
})

export const createAddress = asyncHandler(async (req, res) => {
    const { userId, data } = req.body

    const result = await UserService.createAddress(userId, data)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
})

export const getAddress = asyncHandler(async (req, res) => {
    const { userId } = req.body
    const result = await UserService.getAddress(userId)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
})

export const getAddressForOrder = asyncHandler(async (req, res) => {
    const { addressId } = req.body
    const result = await UserService.getAddressForOrder(addressId)

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
    })
})