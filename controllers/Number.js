import path from "path";
import Number from "../models/NumberModel.js";

export const getNumbers = async (req, res) => {
  try {
    const response = await Number.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getNumberById = async (req, res) => {};

export const createNumber = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { symbol, description } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/numbers/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/numbers/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Number.create({
        symbol: symbol,
        description: description,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Number Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateNumber = async (req, res) => {};

export const deleteNumber = async (req, res) => {};
