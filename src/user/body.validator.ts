import { Request, Response } from "express";

class BodyValidator {
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
          return res.status(404).send({message:err.message})
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
            return res.status(404).send({message:err.message})
          }
        };
      };
}
export default new BodyValidator();