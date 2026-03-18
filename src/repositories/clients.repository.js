const db = require("../config/db");

async function findAllClients() {
  try {
    return await db("clients").select("*");
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllClients,
};
