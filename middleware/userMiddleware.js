import { userSchema, userUpdateSchema } from "../schemas/userSchemas.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const userValidate = (req, res, next) => {
  let error;

  if (req.method === "POST") {
    ({ error } = userSchema.validate(req.body, { abortEarly: false }));
  } else {
    ({ error } = userUpdateSchema.validate(req.body, { abortEarly: false }));
  }

  if (error) {
    return next(new ErrorResponse("Validation Error", 400, error.details.map(err => err.message)));
  }

  next();
};
