import express from "express";
import {
  getCategoryChallenge,
  getCategoryChallengeById,
  createCategoryChallenge,
  updateCategoryChallenge,
  deleteCategoryChallenge,
} from "../controllers/CategoryChallenge.js";

const router = express.Router();

router.get("/category-challenges", getCategoryChallenge);
router.get("/category-challenge/:id", getCategoryChallengeById);
router.post("/category-challenge", createCategoryChallenge);
router.patch("/category-challenge/:id", updateCategoryChallenge);
router.delete("/category-challenge/:id", deleteCategoryChallenge);

export default router;
