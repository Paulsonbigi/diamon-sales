import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    productName: {
        type: String
    },

    productCategory: {
        type: String
    },

    productQuantity: {
        type: Number
    },

    productPrice: {
        type: Number
    },

    productImages: {
        type: [ Object ]
    }
})

ProductSchema.index({ '$**': 'text'})
export const Product = mongoose.model("product", ProductSchema);