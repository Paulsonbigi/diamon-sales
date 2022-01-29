import mongoose, { Schema, model } from "mongoose";

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            product: {
                type: Object,
                ref: "Product"
            },
            totalItem: {
                type: Number
            }
        }
    ]
})

export default model("cart", CartSchema);