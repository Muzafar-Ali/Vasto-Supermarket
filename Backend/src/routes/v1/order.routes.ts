import { Router } from "express";
import { createCheckoutSessionHandler, getOrdersHandler, stripeWebhookHandler } from "../../controllers/order.controller.js";
import validateRequest from "../../middlewares/validateRequest.middleware.js";
import { orderRequestSchema } from "../../schema/order.schema.js";

const router = Router();

router.route("/payment/create-checkout-session").post(validateRequest(orderRequestSchema), createCheckoutSessionHandler);
router.route("/all").get(getOrdersHandler);

export default router;