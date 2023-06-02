import argon2 from "argon2";
import User from "../models/UserModel.js";

export const login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user)
    return res.status(404).json({
      msg: "Upss! Sepertinya kamu salah memasukkan email atau password.",
    });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match)
    return res.status(400).json({
      msg: "Upss! Sepertinya kamu salah memasukkan email atau password.",
    });
  req.session.userId = user.uuid;
  const { uuid, name, email, role } = user;
  res.status(200).json({
    uuid,
    name,
    email,
    role,
  });
};

export const me = async (req, res) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ msg: "Silahkan login menggunakan akun anda" });
  }
  const user = await User.findOne({
    attributes: [
      "uuid",
      "id",
      "firstName",
      "lastName",
      "email",
      "role",
      "image",
      "url",
    ],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json(user);
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Cant log out" });
    res.status(200).json({ msg: "You have logged out" });
  });
};
