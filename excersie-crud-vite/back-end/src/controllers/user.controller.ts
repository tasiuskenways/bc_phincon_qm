import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { name, username, email, password } = req.body;
      const user = await prisma.user.create({
        data: { name, username, email, password },
      });
      res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      console.error("Failed to create user:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to create user",
      });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
        return;
      }
      res.json({
        status: "success",
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Failed to get user:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to get user",
      });
    }
  },

  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.json({
        status: "success",
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      console.error("Failed to get users:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to get users",
      });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, username, email, password } = req.body;
      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (username !== undefined) updateData.username = username;
      if (email !== undefined) updateData.email = email;
      if (password !== undefined) updateData.password = password;

      const user = await prisma.user.update({
        where: { id },
        data: updateData,
      });
      res.json({
        status: "success",
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      console.error("Failed to update user:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to update user",
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.delete({ where: { id } });
      res.json({
        status: "success",
        message: "User deleted successfully",
        data: user,
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to delete user",
      });
    }
  },
};

export default userController;
