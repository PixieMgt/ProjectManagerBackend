require("dotenv").config();
const knex = require("knex");

const db = knex({
  client: "mssql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    options: {
      encrypt: false,
    },
  },
});

module.exports = db;
