import { orderSchema } from "../schemas/orderSchemas.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const orderValidate = (req, res, next) => {
  const { error } = orderSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return next(new ErrorResponse("Validation Error", 400, error.details.map(err => err.message)));
  }

  next();
};
