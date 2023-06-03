import Challenge from "../models/ChallengeModel.js";

export const getChallenges = async (req, res) => {
  try {
    const response = await Challenge.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getChallengeById = async (req, res) => {};

export const createChallenge = async (req, res) => {};

export const updateChallenge = async (req, res) => {};

export const deleteChallenge = async (req, res) => {};
