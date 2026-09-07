import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { HTTP_STATUS } from '../constants/http.status.code.js'

config()

export const auth = async (req, res, next) => {
    try{
        const token = req.cookies.accessToken

        if(!token){
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({message: 'Token not provided'})
        }

        const decode = jwt.verify(token, process.env.JWT_ACCESS)

        const response = await fetch(`${process.env.USER_SERVICE_URL}/getUser/${decode.id}`)
        const result = await response.json()

        if(!result?.success){
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'User not found'})
        }

        if(result.isBlocked){
            return res.status(HTTP_STATUS.FORBIDDEN).json({
                message: `User ${decode.email}, has been blocked by admin`,
                code: 'USER_BLOCKED'
            })
        }    

        
        req.user = decode

        next()        
    }   
    catch(err) {
        console.log("❌ JWT ERROR:", err.message);
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
}