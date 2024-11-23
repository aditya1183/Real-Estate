import express from "express";
import jwt from "jsonwebtoken";
import {
  google,
  signOut,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", verifyToken, signOut);

router.post("/checkaccestoken", (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(404).json({ message: "Token not found! " });
  }

  jwt.verify(token, "adityaaditya", (err, user) => {
    if (err) {
      return res
        .status(404)
        .json({ message: "Token is expired or invalid! aditya" });
    }

    // Token is valid
    res.status(200).json({ message: "Token is valid!", user });
  });
});

export default router;
