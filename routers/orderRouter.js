import { Router } from "express";
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.js";
import { orderValidate } from "../middleware/orderMiddleware.js";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.post("/", orderValidate, createOrder);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", orderValidate, updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
