import { HTTP_STATUS } from '../constants/http.status.code.js'
import { AppError } from '../exceptions/app.error.js'
import axios from 'axios'
import { userService } from '../config/services.js'

export const login = async (data) => {
    const response = await axios.post(`${userService}/login`, data)

    return response.data
}

export const register = async(data) => {
    const response = await axios.post(`${userService}/register`, data)

    return response.data
}

// export const logout = async() => {
//     const response = await axios.post(`${userService}/logout`)

//     return response.data
// }

export const getMe = async (userId) => {
    const response = await axios.get(`${userService}/getMe/${userId}`)

    return response.data
}

export const createAddress = async (userId, data) => {
    const response = await axios.post(`${userService}/createAddress`, { userId, data })

    return response.data
}

export const getAddress = async (userId) => {
    const response = await axios.post(`${userService}/getAddress`, userId)

    return response.data
}