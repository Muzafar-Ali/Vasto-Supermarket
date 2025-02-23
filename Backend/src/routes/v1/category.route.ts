import { Router } from "express";
import { addCategoryHandler } from "../../controllers/category.controllers.js";
import validateRequest from "../../middlewares/validateRequest.middleware.js";
import { addCategorySchema } from "../../schema/category.schema.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post( upload.single('image'), validateRequest(addCategorySchema), addCategoryHandler);

export default router;
