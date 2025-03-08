import { Router } from "express";
import isAuthenticated from "../../middlewares/isAuthenticated.middleware.js";
import { addSubCategoryHandler, getAllSubCategoriesHandler, getSubCategoriesByCategoryIdHandler, updateSubCAtegory } from "../../controllers/subCategory.controllers.js";
import { upload } from "../../middlewares/multer.middleware.js";
import validateRequest from "../../middlewares/validateRequest.middleware.js";
import { getProductByIdSchema } from "../../schema/product.schema.js";

const router = Router();

router.route("/")
.post(isAuthenticated, upload.single("image"), addSubCategoryHandler)
.get(getAllSubCategoriesHandler)

router.route("/:id")
.get(validateRequest(getProductByIdSchema), getSubCategoriesByCategoryIdHandler)
.patch(isAuthenticated, upload.single("image"), updateSubCAtegory)

export default router;