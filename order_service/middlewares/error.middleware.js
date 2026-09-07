import { AppError } from "../exceptions/app.error.js"
import { HTTP_STATUS } from "../constants/http.status.code.js"

export const errorHandler = (err, req, res, next) => {
    console.log('error status code', err.statusCode)
    console.log('error from error handler', err)
    if(err instanceof AppError){
        return res
        .status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message })
    }

    return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: err.message})
}