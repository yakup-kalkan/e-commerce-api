import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ include: [Product, User] });
    res.json(orders);
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { userId, products } = req.body;
    const productIds = products.map(product => product.productId);
    const fetchedProducts = await Product.findAll({ where: { id: productIds } });

    if (!fetchedProducts.length) {
      return next(new ErrorResponse("No valid products found.", 400));
    }

    const productMap = new Map(products.map(product => [product.productId, product.quantity]));
    const total = fetchedProducts.reduce((sum, product) => {
      const quantity = productMap.get(product.id) || 1;
      return sum + product.price * quantity;
    }, 0);

    const order = await Order.create({ userId, total });

    await Promise.all(products.map(async (product) => {
      await order.addProduct(product.productId, { through: { quantity: product.quantity } });
    }));

    res.json({ id: order.id, userId: order.userId, products: products.map(product => ({
      productId: product.productId,
      quantity: product.quantity
    })), total });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};


export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [Product, User] });
    if (!order) return next(new ErrorResponse("Order not found", 404));
    res.json(order);
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return next(new ErrorResponse("Order not found", 404));
    await order.update(req.body);
    res.json(order);
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return next(new ErrorResponse("Order not found", 404));
    await order.destroy();
    res.json({ message: "Order deleted" });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

