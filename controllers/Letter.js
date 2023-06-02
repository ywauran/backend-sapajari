import argon2 from "argon2";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import Letter from "../models/LetterModel.js";

export const getLetters = async (req, res) => {
  try {
    const response = await Letter.findAll();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getLetterById = async (req, res) => {};

export const createLetter = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { symbol, description } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/letter/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Letter.create({
        symbol: symbol,
        description: description,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Letter Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateLetter = async (req, res) => {};

export const deleteLetter = async (req, res) => {};
