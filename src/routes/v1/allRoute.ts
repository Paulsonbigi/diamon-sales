import { Router } from "express";
import productRouter from "../../product/product.routes";
import userRoutes from "../../user/user.routes";
import cartRoutes from "../../cart/cart.routes";

const router = Router();

router.use("/product", productRouter);
router.use("/user", userRoutes);
router.use("/cart", cartRoutes);
export default router;