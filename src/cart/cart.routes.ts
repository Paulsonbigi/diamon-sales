import { Router } from "express";
import CartController from "./cart.controller";
import authMiddleware from "../middleware/authGuard";
import useGuard from "../middleware/guard";

const cartRoutes = Router();

cartRoutes.post("/add", CartController.addToCartController);

export default cartRoutes;