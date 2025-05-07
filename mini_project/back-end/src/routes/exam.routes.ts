import express from "express";
import examController from "../controllers/exam.controller";

const router = express.Router();

router.get("/completed/:userId", examController.findUserCompletedExams);

export default router;
