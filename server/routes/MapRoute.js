import express from "express";
import { getMapData, getMapDataById } from "../controllers/MapController.js";

const router = express.Router();
router.get("/mapdata", getMapData);
router.get("/mapdata/:id", getMapDataById);

export default router;
