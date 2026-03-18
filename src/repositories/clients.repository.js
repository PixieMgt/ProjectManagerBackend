const db = require("../config/db");

async function findAllClients() {
  try {
    const clients = await db("clients").select("*");
    return clients;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllClients,
};
