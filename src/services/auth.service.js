import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser
} from "../data/auth.data.js";

export const registerUserService = async (data) => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    const error = new Error("Email sudah terdaftar");
    error.statusCode = 409;
    error.code = "EMAIL_DUPLIKAT";
    throw error;
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    email: data.email,
    passwordHash
  });

  return {
    id: user.id,
    email: user.email
  };
};

export const loginUserService = async (data) => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    const error = new Error("Email atau password salah");
    error.statusCode = 401;
    error.code = "LOGIN_GAGAL";
    throw error;
  }

  const passwordBenar = await bcrypt.compare(
    data.password,
    user.passwordHash
  );

  if (!passwordBenar) {
    const error = new Error("Email atau password salah");
    error.statusCode = 401;
    error.code = "LOGIN_GAGAL";
    throw error;
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return { token };
};
