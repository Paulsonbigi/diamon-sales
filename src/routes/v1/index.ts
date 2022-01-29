import { Router } from "express";
import allRoutes from "./allRoute";

const router = Router();

router.use("/api/v1", allRoutes);

export default router;