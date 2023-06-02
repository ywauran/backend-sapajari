import argon2 from "argon2";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {};

export const createUser = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { firstName, lastName, email, password } = req.body;
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

  const hashPassword = await argon2.hash(password);
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        image: fileName,
        url: url,
        role: "guest",
      });
      res.status(201).json({ msg: "User Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};
