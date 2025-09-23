import express from "express";
import {
  register,
  deregister,
  upvote,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/register", register);
router.post("/deregister/:id", deregister);
router.post("/upvote/:id", upvote);

export default router;
