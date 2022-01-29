import { Request, Response, NextFunction } from "express"
import productService from "./product.service"
import HttpException from "../exceptions/HttpException";
import {  ObjectId } from "mongoose";
class productGuard {
    public checkIfProductNameExists = async (req: Request, res: Response) => {
        
        const check: boolean = await productService.propExist({ productName: req.body.productName });
        
        if(check)  throw new HttpException(400, "Product name already created");
    }

    public checkIfProductIdExists = async (req: Request, res: Response) => {
        const check: boolean = await productService.propExist({ _id: req.params.id });
        if(!check) throw new HttpException(400, "Product Id does not exist");
    }
}

export default new productGuard()