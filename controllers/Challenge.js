import Challenge from "../models/ChallengeModel.js";
import CategoryChallenge from "../models/CategoryChallengeModel.js";
import { Sequelize } from "sequelize";

export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.findAll({
      include: CategoryChallenge, // Include the CategoryChallenge model
    });
    res.status(200).json(challenges);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getChallengeById = async (req, res) => {};

export const createChallenge = async (req, res) => {
  const { text, categoryChallengeId } = req.body;
  try {
    await Challenge.create({
      text: text,
      categoryChallengeId: categoryChallengeId,
    });
    res.status(201).json({ msg: "Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateChallenge = async (req, res) => {
  try {
    await Challenge.update(req.body, {
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data Berhasil diperbarui" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteChallenge = async (req, res) => {
  try {
    await Challenge.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getRandomChallengeByCategoryChallenge = async (req, res) => {
  const { id } = req.params;

  try {
    const challenges = await Challenge.findAll({
      where: {
        categoryChallengeId: id,
      },
    });

    if (!challenges) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    const sortedChallenges = challenges.sort(() => Math.random() - 0.5);
    const randomChallenge = sortedChallenges.slice(0, 1);

    res.status(200).json(randomChallenge);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
