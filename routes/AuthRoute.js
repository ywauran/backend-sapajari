import express from "express";
// eslint-disable-next-line import/extensions
import { login, logout, me } from "../controllers/Auth.js";

const router = express.Router();

router.get("/me", me);
router.post("/login", login);
router.delete("/logout", logout);

export default router;
