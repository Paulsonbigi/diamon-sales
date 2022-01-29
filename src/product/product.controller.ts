import { Request, Response, NextFunction } from "express";
import ProductService from "./product.service";
import HttpException from "../exceptions/HttpException";
import { ProductInterface } from "./product.interface";
import { ProductQuery } from "../common/product.query.interface";
class ProductController {
    private readonly ProductService = ProductService;
    
    public createProductController  =async (req:any, res:Response, next:NextFunction) => {
        
        try{
            const productData: ProductInterface = req.body;
            const productPics: object[] = req.files;

            const Products = await ProductService.createProductService(productData, productPics);
            res.status(200).json({
                data: Products,
                message: "Product created successfully"
            })

        } catch(err: any) {
            next(new HttpException(500, "Internal server error"));
        }
    };

    public getAllProductController  =async (req:Request, res:Response, next:NextFunction) => {
        try{
            const page:number = parseInt(req.query.page as any) || 1;
            const limit:number = parseInt(req.query.limit as any) || 5;
            const searchText = req.query.searchText || "";

            const products = await ProductService.getAllProducts(searchText, page, limit);
            res.status(200).json({
                data: products,
                message: `${products.length} products retrieved successfully`
            })

        } catch(err: any) {
            next(new HttpException(500, "Internal server error"))
        }
    };

    public getAllProductByOptionsController  =async (req:Request, res:Response, next:NextFunction) => {
        try{
            const page:number = parseInt(req.query.page as any) || 1;
            const limit:number = parseInt(req.query.limit as any) || 5;
            const searchText = req.query.productCategory || "";

            const prodCategory = await ProductService.getAllProductsByOptions(searchText, page, limit);
            res.status(200).json({
                data: prodCategory,
                message: `${prodCategory.length} products retrieved successfully`
            })

        } catch(err: any) {
            next(new HttpException(500, "Internal server error"))
        }
    };

    public getAllProductByIdController  =async (req:Request, res:Response, next:NextFunction) => {
        try{
        
            const prodCategoryId:string = req.params.id;
            const products = await ProductService.getProductById(prodCategoryId);
            res.status(200).json({
                data: products,
                message: `Product retrieved successfully`
            })

        } catch(err: any) {
            next(new HttpException(500, "Internal server error"))
        }
    };

    public updateProductController  =async (req:Request, res:Response, next:NextFunction) => {
        try{
            const productData: ProductInterface = req.body;
            const productId:string = req.params.id;

            const Products = await ProductService.updateProductService(productId,productData);
            res.status(200).json({
                data: Products,
                message: "Product created successfully"
            })

        } catch(err: any) {
            next(new HttpException(500, "Internal server error"))
        }
    };

    public deleteProductByIdController  =async (req:Request, res:Response, next:NextFunction) => {
        try{
        
            const prodCategoryId:string = req.params.id;
            await ProductService.deleteByIdService(prodCategoryId);
            res.status(200).json({
                message: "Product deleted successfully"
            })

        } catch(err: any) {
            next(new HttpException(500, "Internal server error"))
        }
    };
}

export default new ProductController();