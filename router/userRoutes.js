import express from "express";
import { signup, login, getUser, logout } from "../controller/userController.js";
import authMiddleware from "../middleware/jwt.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user/:id", authMiddleware, getUser);
router.post("/logout/:id", logout);

export default router;
