import { Router } from "express";
import { refreshAccessTokenHandler, registerUserHandler, userLoginHandler, userLogoutHandler } from "../../controllers/user.controller.js";
import validateRequest from "../../middlewares/validateRequest.middleware.js";
import { registerUserSchema, userLoginSchema } from "../../schema/user.schema.js";
import isAuthenticated from "../../middlewares/isAuthenticated.middleware.js";

const router = Router();

router.route("/register").post( validateRequest(registerUserSchema), registerUserHandler)
router.route("/login").post( validateRequest(userLoginSchema), userLoginHandler)
router.route("/logout").post( isAuthenticated, userLogoutHandler)
router.route("/refresh-token").post( refreshAccessTokenHandler)

export default router;