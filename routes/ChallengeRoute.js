import express from "express";
import {
  getChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from "../controllers/Challenge.js";

const router = express.Router();

router.get("/challenges", getChallenges);
router.get("/challenge/:id", getChallengeById);
router.post("/challenge", createChallenge);
router.patch("/challenge/:id", updateChallenge);
router.delete("/challenge/:id", deleteChallenge);

export default router;
