import {
  registerUserService,
  loginUserService
} from "../services/auth.service.js";

// Controller untuk register
export const register = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Controller untuk login
export const login = async (req, res, next) => {
  try {
    const result = await loginUserService(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Controller untuk melihat pengguna yang sedang login
export const getCurrentUser = (req, res) => {
  res.status(200).json({
    id: req.user.id
  });
};
