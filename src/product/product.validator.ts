import * as Joi from "joi";
import { ProductEnum } from "./product.enum";

export const createProductValidator = Joi.object({

    productName: Joi.string().trim().required().messages({
        "string.base": `"Product Name" should be of type 'text'`,
        "any.empty": `"Product Name" is required`,
    }),

    productCategory: Joi.string().valid(...Object.values(ProductEnum)).required().messages({
        "string.base": `"Product Category" should be of type 'text'`,
        "any.empty": `"Product Category" is required`,
    }),

    productQuantity: Joi.number().min(0).required().messages({
        "string.base": `"Product Quantity" should be of type 'text'`,
        "any.empty": `"Product Quantity" is required`,
    }),

    productImages: Joi.array().optional().messages({
        "string.base": `"Product Category" should be of type 'text'`,
        "any.empty": `"Product Category" is required`,
    }),

    productPrice: Joi.number().min(0).required().messages({
        "string.base": `"Product Price" should be of type 'text'`,
        "any.empty": `"Product Price" is required`,
    }),

});

export const updateProductValidator = Joi.object({

    productName: Joi.string().trim().required().messages({
        "string.base": `"Product Name" should be of type 'text'`,
        "any.empty": `"Product Name" is required`,
    }),

    productCategory: Joi.string().valid(...Object.values(ProductEnum)).required().messages({
        "string.base": `"Product Category" should be of type 'text'`,
        "any.empty": `"Product Category" is required`,
    }),

    productQuantity: Joi.number().min(0).required().messages({
        "string.base": `"Product Quantity" should be of type 'text'`,
        "any.empty": `"Product Quantity" is required`,
    }),

    productImages: Joi.array().optional().messages({
        "string.base": `"Product Category" should be of type 'text'`,
        "any.empty": `"Product Category" is required`,
    }),

    productPrice: Joi.number().min(0).required().messages({
        "string.base": `"Product Price" should be of type 'text'`,
        "any.empty": `"Product Price" is required`,
    }),
})