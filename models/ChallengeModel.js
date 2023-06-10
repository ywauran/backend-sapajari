import { Sequelize } from "sequelize";
// eslint-disable-next-line import/extensions
import db from "../config/Database.js";
import CategoryChallengeModel from "./CategoryChallengeModel.js";

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

CategoryChallengeModel.hasMany(Challenge);

Challenge.belongsTo(CategoryChallengeModel, {
  foreignKey: "categoryChallengeId",
});

export default Challenge;
