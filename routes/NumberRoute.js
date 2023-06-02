import express from "express";
import {
  getNumbers,
  getNumberById,
  createNumber,
  deleteNumber,
  updateNumber,
} from "../controllers/Number.js";

const router = express.Router();

router.get("/numbers", getNumbers);
router.get("/number/:id", getNumberById);
router.post("/number", createNumber);
router.patch('/number":id', updateNumber);
router.delete("/number/:id", deleteNumber);

export default router;
