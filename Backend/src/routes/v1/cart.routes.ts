import { Router } from "express";
import { addItemToCartHandler } from "../../controllers/cartItem.controllers.js";

export const router = Router();

router.post("/", addItemToCartHandler);

export default router