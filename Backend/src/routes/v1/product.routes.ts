import { Router } from "express";
import { createProductHandler, deleteProductHandler, getAllProductssHandler, updateProductHandler } from "../../controllers/product.controllers.js";
import isAuthenticated from "../../middlewares/isAuthenticated.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import validateRequest from "../../middlewares/validateRequest.middleware.js";
import { createProductSchema, deletProductSchema, updateProductSchema } from "../../schema/product.schema.js";

const router = Router();

router.route("/")
.post(isAuthenticated, upload.array("image"), validateRequest(createProductSchema), createProductHandler)
.get(getAllProductssHandler);

router.route("/:id")
.patch(isAuthenticated, validateRequest(updateProductSchema), updateProductHandler)
.delete(isAuthenticated, validateRequest(deletProductSchema), deleteProductHandler);

export default router;