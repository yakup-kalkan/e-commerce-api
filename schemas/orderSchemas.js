import Joi from "joi";

export const orderSchema = Joi.object({
  userId: Joi.number().integer().required(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.number().integer().required(),
      quantity: Joi.number().integer().required(),
    })
  ).required(),
  total: Joi.number(),
});