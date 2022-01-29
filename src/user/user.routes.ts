import { Router } from "express";
import userController from "./user.controller";
import bodyValidator from "./body.validator";
import userValidator from "./user.validator";
import useGuard from "../middleware/guard";
import userGuard from "./user.guard";
import authMiddleware from "../middleware/authGuard";


class userRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {

    this.router.get(
      "/search",
      useGuard(authMiddleware.requireAuth),
     useGuard(authMiddleware.checkIfUserIsAdmin),
      userController.searchUser

    )


    this.router.post(
      "/user-signup",
      bodyValidator.useBodyValidator(userValidator.createUserValidator),
      useGuard(userGuard.userSignUpGuard),
      userController.userSignup
    );

    this.router.post(
      "/user-login",
      bodyValidator.useBodyValidator(userValidator.loginUserValidator),
      useGuard(userGuard.userLoginGuard),
      userController.userLogin
    );

    this.router.put(
      "/update-user/:id",
      bodyValidator.useBodyValidator(userValidator.editUserValidator),
      useGuard(authMiddleware.requireAuth),
      useGuard(authMiddleware.checkIfUserIsAdmin),
       userController.updateUser
    );


    this.router.delete(
        "/delete-user/:id",
        bodyValidator.useBodyValidator(userValidator.editUserValidator),
        useGuard(authMiddleware.requireAuth),
        useGuard(authMiddleware.checkIfUserIsAdmin),
        userController.deleteUser
      );

      this.router.get(
        "/get-all",
        useGuard(authMiddleware.requireAuth),
        useGuard(authMiddleware.checkIfUserIsAdmin),
        userController.getAllUserPag

      );

      }
    }
export default new userRouter().router;
