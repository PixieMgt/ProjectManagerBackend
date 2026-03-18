const db = require("../config/db");

async function findAllUsers() {
  try {
    return await db("users").select("*");
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllUsers,
};
