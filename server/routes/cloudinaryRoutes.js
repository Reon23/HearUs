import express from "express";
import { uploadToBlob } from "../controllers/cloudinaryController.js";

const router = express.Router();

router.post("/uploadImage", uploadToBlob);

export default router;
