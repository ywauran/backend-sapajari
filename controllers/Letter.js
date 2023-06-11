import path from "path";
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
  const url = `${req.protocol}://${req.get("host")}/images/letters/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/letters/${fileName}`, async (err) => {
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

export const updateLetter = async (req, res) => {
  const letter = await Letter.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!letter) return res.status(404).json({ msg: "Data tidak ditemukan" });
  const { symbol, description } = req.body;
  try {
    await Letter.update(
      {
        symbol: symbol,
        description: description,
      },
      {
        where: {
          id: letter.id,
        },
      }
    );
    res.status(200).json({ msg: "Data berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteLetter = async (req, res) => {
  const letter = await Letter.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!letter) return res.status(404).json({ msg: "Data tidak ditemukan" });
  try {
    await Letter.destroy({
      where: {
        id: letter.id,
      },
    });
    res.status(200).json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
