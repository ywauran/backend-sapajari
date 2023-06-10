import { Sequelize } from "sequelize";

const db = new Sequelize("db_sapajari", "root", "123456", {
  host: "34.101.197.80",
  dialect: "mysql",
});

export default db;
