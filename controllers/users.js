import User from "../models/User.js";
import Order from "../models/Order.js";
import ErrorResponse from '../utils/ErrorResponse.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ include: Order });
    res.json(users);
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const found = await User.findOne({ where: { email } });
    if (found) return next(new ErrorResponse("User already exists", 400));

    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Order });

    if (!user) return next(new ErrorResponse("User not found", 404));

    res.json(user);
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Order });

    if (!user) return next(new ErrorResponse("User not found", 404));

    await user.update(req.body);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      Orders: user.Orders,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return next(new ErrorResponse("User not found", 404));

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};
