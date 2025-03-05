import { Router } from "express";
import { addCategoryHandler, deleteCategoryHandler, getAllCategoriesHandler, getSingleCategoryHandler, updateCategoryHandler } from "../../controllers/category.controllers.js";
import validateRequest from "../../middlewares/validateRequest.middleware.js";
import { addCategorySchema, deleteCategorySchema, updateCategorySchema } from "../../schema/category.schema.js";
import { upload } from "../../middlewares/multer.middleware.js";
import isAuthenticated from "../../middlewares/isAuthenticated.middleware.js";

const router = Router();

router.route("/")
.post( isAuthenticated, upload.single('image'), validateRequest(addCategorySchema), addCategoryHandler)
.get(getAllCategoriesHandler);

router.route("/:id")
.get(getSingleCategoryHandler)
.patch(isAuthenticated, upload.single('image'), validateRequest(updateCategorySchema), updateCategoryHandler)
.delete(isAuthenticated, validateRequest(deleteCategorySchema), deleteCategoryHandler);

export default router;
