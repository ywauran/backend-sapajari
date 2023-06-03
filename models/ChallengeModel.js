import { Sequelize } from "sequelize";
// eslint-disable-next-line import/extensions
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Challenge = db.define(
  "challenge",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Challenge;
