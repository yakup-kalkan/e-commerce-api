import { Router } from "express";
import CategoryController from "../controllers/categories.js";
import { categotyValidate } from "../middleware/categoryMiddleware.js";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getCategories);
categoryRouter.get("/:id", CategoryController.getCategory);
categoryRouter.post("/", categotyValidate, CategoryController.createCategory);
categoryRouter.put("/:id", CategoryController.updateCategory);
categoryRouter.delete("/:id", CategoryController.deleteCategory);

export default categoryRouter;
