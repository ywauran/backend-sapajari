import path from "path";
import CategoryChallenge from "../models/CategoryChallengeModel.js";

export const getCategoryChallenge = async (req, res) => {
  try {
    const response = await CategoryChallenge.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryChallengeById = async (req, res) => {};

export const createCategoryChallenge = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { title, description } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get(
    "host"
  )}/images/category-challenge/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/category-challenge/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await CategoryChallenge.create({
        title: title,
        description: description,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Category Challenge Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateCategoryChallenge = async (req, res) => {};

export const deeleteCategoryChallenge = async (req, res) => {};
