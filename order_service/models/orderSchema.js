import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    // address: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    // products: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // }],
    address: {},
    products: [],
    payment: String,
    subTotal: Number,
    payableAmount: Number,
    status: String

}, { timestamps: true })

const Order = mongoose.model('order', OrderSchema)
export default Order


// data = {...data, userId: user?.id, products: products, subTotal: total, payableAmount: total + 99}