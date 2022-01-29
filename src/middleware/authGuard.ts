import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../user/user.model";
import HttpException from "../exceptions/HttpException";

class authMiddleware {
  public requireAuth = async (req: any, res: Response, next: NextFunction) => {
    try{
      let auth: any = req.headers['authorization'];
      if(!auth){
        throw new HttpException(401, "Invalid token, login to access this resource")
      }
      let token: string = auth.split("Bearer")[1].trim();
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );
      const currentUser: any = await UserModel.findById(decoded.user_id);
      if (!currentUser) {
        throw new HttpException(401, "logged out")
      }
      req.user = currentUser;
    } catch(err: any) {
        throw new HttpException(401, "Invalid token, sign-in to access this resource")
    }
  };

  checkIfUserIsAdmin = (req: any, res: Response) => {
    if ( req.user && req.user.role === "user") 
      throw new HttpException(401, "Sorry you are not allowed to perform this operation")
  };
}

export default new authMiddleware();
