import express from "express";
import { register, deregister } from "../controllers/complaintController.js";

const router = express.Router();

router.post("/register", register);
router.post("/deregister/:id", deregister);

export default router;
