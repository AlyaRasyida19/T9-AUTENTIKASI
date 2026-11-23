import prisma from "../prisma.js";

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

export const createUser = async (data) => {
  return await prisma.user.create({
    data
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      createdAt: true
    }
  });
};
