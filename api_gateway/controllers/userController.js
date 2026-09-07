import { asyncHandler } from "../utils/async.handler.js"
import { HTTP_STATUS } from "../constants/http.status.code.js"
import * as UserService from '../services/userService.js'

export const login = asyncHandler(async (req, res) => {
    console.log('======================================= here =========================================')
    const result = await UserService.login(req.body)
    const { accessToken, user } = result

    console.log('login result', result)

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(HTTP_STATUS.OK).json({
        success: true,
        user
    })
})

export const register = asyncHandler(async (req, res) => {    
    const registerUser = await UserService.register(req.body)
    const { accessToken, user } = registerUser

    console.log('register result', register)

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(HTTP_STATUS.OK).json({
        success: true,
        user
    })    
})

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie('accessToken')
    res.status(HTTP_STATUS.OK).json({ success: true, message: 'cookie cleared, logged out' })
})

export const getMe = asyncHandler(async (req, res) => {
    const result = await UserService.getMe(req.user.id)

    res.status(HTTP_STATUS.OK).json(result)
})

// export const getUser = asyncHandler(async (req, res) => {
//     const { userId } = req.params
//     const result = await UserService.getMe(userId)

//     res.status(HTTP_STATUS.OK).json({
//         success: true,
//         user: result
//     })
// })

export const createAddress = asyncHandler(async (req, res) => {
    const result = await UserService.createAddress(req.user.id, req.body)

    res.status(HTTP_STATUS.OK).json(result)
})

export const getAddress = asyncHandler(async (req, res) => {
    const result = await UserService.getAddress(req.body)

    res.status(HTTP_STATUS.OK).json(result)
})