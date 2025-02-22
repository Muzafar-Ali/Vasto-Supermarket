import { Router } from "express";
import { registerUserHandler, userLoginHandler, userLogoutHandler } from "../../controllers/user.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { registerUserSchema, userLoginSchema } from "../../schema/user.schema.js";

const router = Router();

router.route("/register").post( validateRequest(registerUserSchema), registerUserHandler)
router.route("/login").post( validateRequest(userLoginSchema), userLoginHandler)
router.route("/logout").post( userLogoutHandler)

export default router;