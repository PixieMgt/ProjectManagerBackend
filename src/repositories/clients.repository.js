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

async function findClient(id) {
  try {
    const [row] = await db("clients").where({ id }).select("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function insertClient(data) {
  try {
    const [row] = await db("clients").insert(data).returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllClients,
  findClient,
  insertClient,
};
