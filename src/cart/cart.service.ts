import { Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import CartSchema from "./cart.model"
import { Product } from "../product/product.model";
import { CartInterface } from "./cart.interface"
import { ObjectId } from "mongoose";
import { UserModel } from "../user/user.model";

class CartService {
    public AddToCartService = async (req:any, res:Response) => {
        const item: object = { product: req.body.product, totalItem: req.body.quantity };
        // const user: UserModel = req.user;
        
        // if(user === undefined)  return CartSchema.create({ user: null, items: [item] });
        


    }
}

export default new CartService();