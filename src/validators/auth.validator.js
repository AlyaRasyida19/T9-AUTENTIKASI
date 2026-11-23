import Joi from "joi";

// Aturan validasi untuk register
export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .max(100)
    .required(),

  password: Joi.string()
    .min(8)
    .max(72)
    .required()
});

// Aturan validasi untuk login
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .max(100)
    .required(),

  password: Joi.string()
    .min(8)
    .max(72)
    .required()
});