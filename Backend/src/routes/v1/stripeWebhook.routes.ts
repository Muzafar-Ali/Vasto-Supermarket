import express from "express";
import { Router } from "express";
import { stripeWebhookHandler } from "../../controllers/order.controller.js";

const router = Router();

router.route("/webhook").post(express.raw({ type: "application/json" }), stripeWebhookHandler);

export default router;