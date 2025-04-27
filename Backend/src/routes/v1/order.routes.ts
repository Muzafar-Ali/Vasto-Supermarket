import { Router } from "express";
import { createCheckoutSessionHandler, getOrderIdHandler, getOrdersHandler, stripeWebhookHandler } from "../../controllers/order.controller.js";
import validateRequest from "../../middlewares/validateRequest.middleware.js";
import { orderIdSchema, orderRequestSchema } from "../../schema/order.schema.js";

const router = Router();

router.route("/payment/create-checkout-session").post(validateRequest(orderRequestSchema), createCheckoutSessionHandler);
router.route("/:sessionId").get(validateRequest(orderIdSchema), getOrderIdHandler);

export default router;