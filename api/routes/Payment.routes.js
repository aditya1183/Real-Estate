import express from "express";
import { createorder, ordervalidate } from "../controllers/Payment.controller.js";
const router = express.Router();

router.post("/createorder", createorder);
router.post("/validateorder", ordervalidate);

export default router;
