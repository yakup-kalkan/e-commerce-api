import { Router } from "express";
import { productValidate } from "../middleware/productMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import { getProducts,
          getProductById,
          createProduct,
          updateProduct,
          deleteProduct
 } from "../controllers/products.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", upload.single("image"), productValidate, createProduct);
productRouter.put("/:id", upload.single("image"), productValidate, updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;