import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import {UserModel} from "./user.model"
import * as morgan from "morgan";



import { Request, Response } from "express";
import { UserSchema } from "./user.model";
const expiresIn = process.env.JWT_EXP || "1d";
const jwtSecretKey = process.env.JWT_SECRET! || "secret";

class userService {
  public generateJwt = (userObj: object):string => {
    return jwt.sign(userObj, jwtSecretKey, {
      expiresIn: process.env.JWT_EXP,
    });
  };

  public userSignUp = async (req: Request, res: Response):Promise<typeof UserSchema> => {
    const user = await UserModel.create(req.body);
    user.password =  bcrypt.hashSync(req.body.password,10)
    await user.save()
    const userToken = this.generateJwt({
      user_id: user._id,
      roles:req.body.role

    });
    return user
  };


  public userLogin = async (req:Request, res:Response)=>{
    const user = await UserModel.findOne({
        $or:[{username:req.body.username}, { email:req.body.username}]
    }).select("+password")
    if (!user) throw new Error("wrong credentials!");
    const token = this.generateJwt({
      user_id: user._id,
      roles:req.body.role
    });
    return { user, token };
  };



 public updateUser = async (req:Request, res:Response):Promise<void|typeof UserSchema> => {
    let updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) throw new Error("user not found")
    return updated
  };
  
  


public deleteUser = async (req:Request, res:Response):Promise<void|any>=>{
        const id = req.params.id;
        let user = await UserModel.findById(id);
        if(!user)throw new Error("user not found")
        let deleteUser = await UserModel.deleteOne({ _id: id });
        return { user, deleteUser };
      };


    
      public findSingle =async (email:any)=>{
        return UserModel.findOne({email:email})

      }
      public  propExists = (user:any)=>{
        return UserModel.countDocuments(user).then((count:any) => count > 0);
      }

      public searchUser = async (page:any, req:Request, limit:any) => {
      
        	let user = req.query.user
          console.log(user)

        if( page || limit || user) {
        		return await UserModel.find({$text: {$search: user as any}})
         		.limit(limit * 1)
        }
        return await UserModel.find()
       
      }
    }



export default new userService();
