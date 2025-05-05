import express from "express";
import AuthController from "../controllers/auth.controller";
import { loginValidator, registerValidator } from "../validator/auth.validator";

const router = express.Router();

router.post("/login", loginValidator, AuthController.login);
router.post("/register", registerValidator, AuthController.register);

export default router;
