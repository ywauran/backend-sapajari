import express from "express";
import {
  getLetters,
  getLetterById,
  createLetter,
  deleteLetter,
  updateLetter,
} from "../controllers/Letter.js";

const router = express.Router();

router.get("/letters", getLetters);
router.get("/letter/:id", getLetterById);
router.post("/letter", createLetter);
router.patch("/letter/:id", updateLetter);
router.delete("/letter/:id", deleteLetter);

export default router;
