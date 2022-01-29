import { Request, response, Response } from "express";
import userService from "./user.service";
import { UserModel } from "./user.model";

class userController {
//REGISTER A USER
  public userSignup = async (req: Request, res: Response) => {
    try {
      const user = await userService.userSignUp(req, res);
      const results = { message: "user created succesfully", user};
      return res.status(201).json(results);
    } catch (err: any) {
      console.error(err);
      return res.status(500).send({ message: err.message });
    }
  };
//LOGIN A USER
  public userLogin = async (req: Request, res: Response) => {
    try {
      const user = await userService.userLogin(req, res);
      return res.status(200).send({ message: "login succesful", user });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  };

  //UPDATE A USER
  public updateUser = async (req:Request, res:Response) => {
    try {
      const updatedUser = await userService.updateUser(req, res)
      return res.status(200).json({
        message: "user updated successfully", updatedUser
      });
    } catch (err:any) {
      console.error(err);
      res.status(500).send(err.message);
    }
  };

//DELETE A USER
  public deleteUser = async (req: Request, res: Response) => {
    try {
      const data = await userService.deleteUser(req, res);
      return res.status(200).json({
        message: "user deleted successfully",
        data: data,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(403).send(err.message);
    }
  };
//GET ALL USERS IN THE DB
  public getAllUser = async (req: Request, res: Response) => {
    try {
      const getAll = await UserModel.find();
      return res.status(200).send({ message: "user details successful",getAll });
    } catch (err: any) {
      console.error(err);
      return res.status(500).send({ message: "err.message" });
    }
  };
//GET ALL USER WITH PAGINATION
  public getAllUserPag = async (req: Request, res: Response) => {
    const query = req.query.new;
    try {
      const users = query
        ? await UserModel.find().sort({ _id: -1 }).limit(5)
        : await UserModel.find();
      res.status(200).json(users);
    } catch (error) {

    }
  };

public searchUser = async(req:Request, res:Response)=>{
    let results = await userService.searchUser(1, req, 5)
    return results
}

  }
  



export default new userController();
