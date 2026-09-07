import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({    
    name: String,
    price: Number,
    quantity: Number,
    colour: String,
    category: String,
    description: String,
    city: String,
    state: String,
    image: [String],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }    
}, {timestamps: true})

const Product = mongoose.model('product', ProductSchema)
export default Product
