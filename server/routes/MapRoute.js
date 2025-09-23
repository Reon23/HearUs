import express from "express";
import { getMapData } from "../controllers/MapController.js";

const router = express.Router();
router.get("/mapdata", getMapData);

export default router;
