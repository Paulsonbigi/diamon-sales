import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import {CartInterface} from "./cart.interface"
import CartService from "./cart.service"

class CartController {

    public addToCartController  =async (req:Request, res:Response, next:NextFunction) => {
        try{

            const addToCart = await CartService.AddToCartService(req, res);
            res.status(200).json({
                message: "Product deleted successfully",
                data: addToCart
            })

        } catch(err: any) {
            next(new HttpException(500, err.message))
        }
    };
}

export default new CartController(); 