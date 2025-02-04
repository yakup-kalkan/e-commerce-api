import Category from "../models/Category.js";
import ErrorResponse from "../utils/ErrorResponse.js";

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }

  async getCategory(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) return next(new ErrorResponse("Category not found", 404));
      res.json(category);
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }

  async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) return next(new ErrorResponse("Name is required", 400));
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.findByPk(req.params.id);
      if (!category) return next(new ErrorResponse("Category not found", 404));
      await category.update({ name });
      res.json(category);
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) return next(new ErrorResponse("Category not found", 404));
      await category.destroy();
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }
}

export default new CategoryController();
