import { Request, Response, NextFunction } from "express";
import { ProductInterface } from "./product.interface";
import { Product } from "./product.model";
import * as gravatar from "gravatar";
import normalizeUrl from 'normalize-url';
import { ProductQuery } from "../common/product.query.interface";
class ProductService {

    public createProductService  =async (productData: ProductInterface, productPics:object[]):Promise<ProductInterface> => {
        return  await Product.create({...productData, productImages: productPics });
    };

    public propExist = async (prop: object):Promise<boolean> => {
        return await Product.countDocuments(prop).then((prop) => prop > 0);
    };

    public getAllProducts = async (searchText:any, page:number, limit:number):Promise<ProductInterface[]> => {
        if(searchText && searchText ){
            return await Product.find({ $text: { $search: searchText} })
            .limit(limit * 1)
            .skip((page - 1) * limit)
        }        
        return await Product.find().limit(limit * 1)
            .skip((page - 1) * limit)
    };

    public getAllProductsByOptions = async (prodCategory: any, page:number, limit:number):Promise<ProductInterface[]> => {
        if(prodCategory){
            return await Product.find({ prodCategory })
                .limit(limit * 1)
                .skip((page - 1) * limit);
        }
        return [];
    };

    public getProductById = async (prodCategoryId: string):Promise<ProductInterface> => {
        return await Product.findById( prodCategoryId);
    };

    public updateProductService  =async (productId: string, productData: ProductInterface):Promise<ProductInterface> => {
        return await Product.findOneAndUpdate(
            { _id: productId },
            { ...productData },
            { new: true }
        );
    };

    public deleteByIdService = async (productId:string):Promise<void> => {
        await Product.deleteOne({ _id: productId });
        return;
    }
}

export default new ProductService();