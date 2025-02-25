import { Router } from "express";
import isAuthenticated from "../../middlewares/isAuthenticated.middleware.js";
import { addSubCategoryHandler, getAllSubCategoriesHandler, updateSubCAtegory } from "../../controllers/subCategory.controllers.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

router.route("/")
.post(isAuthenticated, upload.single("image"), addSubCategoryHandler)
.get(getAllSubCategoriesHandler)

router.route("/:id")
.patch(isAuthenticated, upload.single("image"), updateSubCAtegory)

export default router;