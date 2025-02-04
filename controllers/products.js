import Product from "../models/Product.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return next(new ErrorResponse("Product not found", 404));
    res.json(product);
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = await Product.create({
      name,
      description,
      price,
      categoryId,
      image,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(new ErrorResponse(error.message, 400));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return next(new ErrorResponse("Product not found", 404));

    const { name, description, price, categoryId } = req.body;
    const image = req.file ? req.file.filename : product.image;

    await product.update({ name, description, price, categoryId, image });

    res.json(product);
  } catch (error) {
    next(new ErrorResponse(error.message, 400));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return next(new ErrorResponse("Product not found", 404));

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};
