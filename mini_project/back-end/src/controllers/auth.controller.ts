import authServices from "../services/auth.services";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import { env } from "../config/env";
import { encrypt } from "../utils/encrypt.utils";

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await authServices.login(req.body.email);
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
      const encryptedPayload = await encrypt(
        JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          phoneNumber: user.phoneNumber,
        })
      );

      const token = Jwt.sign({ ___: encryptedPayload }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN as string,
      } as Jwt.SignOptions);

      res.cookie("auth_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.status(200).json({
        status: "success",
        message: "Login successful",
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
        req.body.email,
        req.body.fullname,
        req.body.phoneNumber
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

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("auth_token");
      res.status(200).json({
        status: "success",
        message: "Logout successful",
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
