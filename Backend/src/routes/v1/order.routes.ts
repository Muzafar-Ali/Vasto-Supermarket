import { Router } from "express";
import { createCheckoutSessionHandler, getOrdersHandler, stripeWebhookHandler } from "../../controllers/order.controller.js";

const router = Router();

router.route("/create-checkout-session").post(createCheckoutSessionHandler);
router.route("/").get(getOrdersHandler);

export default router;