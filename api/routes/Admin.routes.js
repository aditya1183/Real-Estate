import express from "express";
import {
  getAllUsers,
  getsingleuserinfo,
  getalllistings,
} from "../controllers/Admin.controller.js";

const router = express.Router();

// Get All Users
router.post("/getalluser", getAllUsers);
router.get("/getuser/:userId", getsingleuserinfo);
router.get("/getalllistings", getalllistings);

export default router;
