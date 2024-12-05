import express from "express";

import { signup, login } from "../controllers/Authadmin.controller.js";
const router = express.Router();

router.post("/signup", signup);

// Login Route
router.post("/login", login);

export default router;
