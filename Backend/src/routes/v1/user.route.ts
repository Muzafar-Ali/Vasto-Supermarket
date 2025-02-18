import { Router } from "express";
import { registerUserController } from "../../controllers/user.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { registerUserSchema } from "../../schema/reisgterUser.schema.js";

const router = Router();

router.route("/").post( validateRequest(registerUserSchema), registerUserController)

export default router;