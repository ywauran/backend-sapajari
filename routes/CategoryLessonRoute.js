import express from "express";
import {
  getCategoryLessonById,
  getCategoryLessons,
  createCategoryLesson,
  deeleteCategoryLesson,
  updateCategoryLesson,
} from "../controllers/CategoryLesson.js";

const router = express.Router();

router.get("/category-lessons", getCategoryLessons);
router.get("/category-lesson/:id", getCategoryLessonById);
router.post("/category-lesson", createCategoryLesson);
router.patch("/category-lesson/:id", updateCategoryLesson);
router.delete("/category-lesson/:id", deeleteCategoryLesson);

export default router;
