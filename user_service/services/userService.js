import UserSchema from '../models/userSchema.js'
import AddressSchema from '../models/addressSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {config} from 'dotenv'
import { HTTP_STATUS } from '../constants/http.status.code.js'
import { AppError } from '../exceptions/app.error.js'

config()

export const login = async (email, password) => {
    console.log('user login service')
    const user = await UserSchema.findOne({ email })
    
    if (!user) throw new AppError('cannot find the user, unauthorised', HTTP_STATUS.UNAUTHORIZED)    
    if(user.isBlocked) throw new AppError('User is blocked', HTTP_STATUS.FORBIDDEN)
    if(!await bcrypt.compare(password, user.password)) throw new AppError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED)
      
    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_ACCESS,
        { expiresIn: '1h' }
    )

    return {
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isBlocked: user.isBlocked
        }
    }
}

export const register = async(email, password) => {
    const result = await UserSchema.findOne({email})
    if(result){
        throw new Error('User already exist')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await UserSchema.insertOne({email, password: hashedPassword, isBlocked: false})

    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_ACCESS,
        { expiresIn: '1h' }
    )

    return {
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isBlocked: user.isBlocked
        }
    }

}

export const getMe = async (id) => {
    const user = await UserSchema.findOne({_id: id})

    if(!user) {
        throw new Error('cannot find the user')
    }

    return {
            id: user._id,
            name: user.name,
            email: user.email,
            isBlocked: user.isBlocked
        }
}

export const createAddress = async (userId, data) => {
    if(data.defaultAddress){
        await AddressSchema.updateOne({defaultAddress: true}, {$set: {defaultAddress: false}})
    }
    const response = await AddressSchema.insertOne({userId, ...data})

    return response
}

export const getAddress = async (userId) => {
    const response = await AddressSchema.find({userId})

    return response
}

export const getAddressForOrder = async (addressId) => {
    const response = await AddressSchema.findOne({_id: addressId})

    return response
}