import authServices from "../services/auth.services";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import { env } from "../config/env";

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await authServices.login(req.body.username);
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "Invalid username or password",
        });
      }
      const userPassword = user.id + env.SECRET_KEY + req.body.password;
      const isValidUser = bcryptjs.compare(userPassword, user.password);
      if (!isValidUser) {
        res.status(404).json({
          status: "error",
          message: "Invalid username or password",
        });
      }
      const encodedPayloadBase64 = Buffer.from(
        JSON.stringify({
          id: user.id,
          username: user.username,
          role: user.role,
        })
      ).toString("base64");

      const token = Jwt.sign({ ___: encodedPayloadBase64 }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN as string,
      } as Jwt.SignOptions);

      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
          token,
        },
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      await authServices.register(
        req.body.username,
        req.body.password,
        req.body.role
      );
      res.status(201).json({
        status: "success",
        message: "User registered successfully",
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new AuthController();
