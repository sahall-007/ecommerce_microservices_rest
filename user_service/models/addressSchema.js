import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: String,
    address: String,
    number: Number,
    pincode: Number,
    city: String,
    addressType: String,
    defaultAddress: Boolean

}, { timestamps: true })

const Address = mongoose.model('address', AddressSchema)
export default Address
