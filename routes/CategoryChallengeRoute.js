import express from "express";
import {
  getCategoryChallenge,
  getCategoryChallengeById,
  createCategoryChallenge,
  updateCategoryChallenge,
  deeleteCategoryChallenge,
} from "../controllers/CategoryChallenge.js";

const router = express.Router();

router.get("/category-challenges", getCategoryChallenge);
router.get("/category-challenge/:id", getCategoryChallengeById);
router.post("/category-challenge", createCategoryChallenge);
router.patch("/category-challenges/:id", updateCategoryChallenge);
router.delete("/category-challenges/:id", deeleteCategoryChallenge);

export default router;
