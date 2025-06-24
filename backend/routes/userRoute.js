import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, getAllUsers);

export default router;
