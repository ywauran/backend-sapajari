import argon2 from "argon2";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import CategoryLesson from "../models/CategoryLessonModel.js";

export const getCategoryLessons = async (req, res) => {
  try {
    const response = await CategoryLesson.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryLessonById = async (req, res) => {};

export const createCategoryLesson = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { title, description } = req.body;
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

  file.mv(`./public/images/category-lessons/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await CategoryLesson.create({
        title: title,
        description: description,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Category Lesson Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateCategoryLesson = async (req, res) => {};

export const deeleteCategoryLesson = async (req, res) => {};
