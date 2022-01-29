import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
class useValidator {
    public useBodyValidator = (schema:any) => {
        return async (req:Request, res:Response, next:any) => {
          try {
            const data = await schema
              .unknown(false)
              .validateAsync(req.body, { stripUnknown: true });
            req.body = data;
            next();
          } catch (err:any) {
            const message = err.details[0].message;
            next(
              new HttpException(400, err.message)
            )
          }
        };
      };
      
      public useQueryValidator = (schema:any) => {
        return async (req:Request, res:Response, next:any) => {
          try {
            const data = await schema
              .unknown(false)
              .validateAsync(req.query, { stripUnknown: true });
            req.query = data;
            next();
          } catch (err:any) {
            const message = err.details[0].message;
            // return res.status(404).send({message:err.message})
            next(
              new HttpException(400, err.message)
            )
          }
        };
      };
}
export default new useValidator();