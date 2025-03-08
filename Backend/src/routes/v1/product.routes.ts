import { Router } from "express";
import { createProductHandler, deleteProductHandler, getAllProductssHandler, getProductByCategory, getProductBySubCategory, getProductHandler, updateProductHandler } from "../../controllers/product.controllers.js";
import isAuthenticated from "../../middlewares/isAuthenticated.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import validateRequest from "../../middlewares/validateRequest.middleware.js";
import { createProductSchema, getProductByIdSchema, updateProductSchema } from "../../schema/product.schema.js";

const router = Router();

router.route("/")
.post(isAuthenticated, upload.array("image"), validateRequest(createProductSchema), createProductHandler)
.get(getAllProductssHandler);

router.route("/:id")
.get(getProductHandler)
.patch(isAuthenticated, validateRequest(updateProductSchema), updateProductHandler)
.delete(isAuthenticated, validateRequest(getProductByIdSchema), deleteProductHandler);

router.route("/category/:id").get(validateRequest(getProductByIdSchema), getProductByCategory)
router.route("/sub-category/:id").get(validateRequest(getProductByIdSchema), getProductBySubCategory)


export default router;