import mongoose from "mongoose"
import { config } from 'dotenv'

config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, {})
        console.log('Connected to mongodb')
    }
    catch(err){
        console.log(err)
        console.log('Failed to connect to mongodb')
    }
}

export const disconnectDB = async () => {
    await mongoose.connection.close();
};

export default connect