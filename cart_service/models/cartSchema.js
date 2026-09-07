import mongoose from "mongoose"

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: String,
    image: String,
    price: Number,
    quantity: Number,
    city: String,
    state: String

}, { timestamps: true })

const Cart = mongoose.model('cart', CartSchema)
export default Cart
