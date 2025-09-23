import express from "express";
import { login, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", signup);
router.post("/signup", login);

export default router;
