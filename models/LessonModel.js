import { Sequelize } from "sequelize";
// eslint-disable-next-line import/extensions
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Letter = db.define(
  "letter",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    original_image: DataTypes.STRING,
    url_original_image: DataTypes.STRING,
    finger_image: DataTypes.STRING,
    url_finger_image: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Letter;
