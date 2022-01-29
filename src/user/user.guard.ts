import userService from "./user.service";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "./user.model";


class validate {
  public checkIfEmailExist = async (req: Request): Promise<void> => {
    try {
      const checkEmail = await userService.findSingle(req.body.email);
      if (checkEmail) throw new Error("Email already Exist");
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message);
    }
  };



  public userSignUpGuard = async (req: Request,res:Response): Promise<void> => {

    const EmailOrUsername = await UserModel.findOne({
      $or: [
        {
          email: req.body.email,
        },
        {
          username: req.body.username,

        }
      ]
    });

    if (EmailOrUsername)
      throw new Error("email or username already exist");
  };




  public checkIfUserIdExist = async (req: Request): Promise<void> => {
    const result = await UserModel.findById(req.params.id);
    if (!result) throw new Error("user with this Id not found");
  };

  
  public userLoginGuard = async (req: Request, next: NextFunction) => {
    try {
      const verify = await userService.propExists({
        $or: [
          {
            email: req.body.email,
          },
          {
            username: req.body.username,
          },
        ],
      });
     // if (!verify) throw new Error("incorrect credentials");
      //next();
    } catch (err: any) {
      console.error(err);
    }
  };

}


export default new validate();
