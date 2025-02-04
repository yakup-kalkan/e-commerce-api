import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import { userValidate } from "../middleware/userMiddleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", userValidate, createUser);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", userValidate, updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
