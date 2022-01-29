import { Router } from "express";
import productController from "./product.controller";
import useGuard from "../middleware/guard";
import { createProductValidator, updateProductValidator } from "./product.validator";
import { createValidator } from "express-joi-validation"
import productGuard from "./product.guard";
import useValidator from "../middleware/body.validator"
import bodyValidator from "../user/body.validator";
import authMiddleware from "../middleware/authGuard";
import Upload from "../utils/upload"
// import upload from "../utils/upload";

const router = Router();
const validator = createValidator()

router.post("/create", useGuard(authMiddleware.requireAuth), useGuard(authMiddleware.checkIfUserIsAdmin), Upload.array("productImages"), useValidator.useBodyValidator(createProductValidator), useGuard(productGuard.checkIfProductNameExists), productController.createProductController);
router.get("/list", productController.getAllProductController);
router.get("/sort", productController.getAllProductByOptionsController);
router.get("/list/:id", productController.getAllProductByIdController);
router.patch("/update/:id", useGuard(authMiddleware.requireAuth), useGuard(authMiddleware.checkIfUserIsAdmin), useValidator.useBodyValidator(updateProductValidator), useGuard(productGuard.checkIfProductIdExists), productController.updateProductController);
router.delete("/delete/:id", useGuard(authMiddleware.requireAuth), useGuard(authMiddleware.checkIfUserIsAdmin), useGuard(productGuard.checkIfProductIdExists), productController.deleteProductByIdController);

export default router;