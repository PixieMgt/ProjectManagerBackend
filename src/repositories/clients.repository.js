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

async function changeClient(id, data) {
  try {
    const [row] = await db("clients").where({ id }).update(data).returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function removeClient(id) {
  try {
    const [row] = await db("clients").where({ id }).delete().returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllUserClients(id) {
  try {
    const clients = await db("clients")
      .where({ owner_user_id: id })
      .select("*");
    return clients;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllClients,
  findClient,
  insertClient,
  changeClient,
  removeClient,
  findAllUserClients,
};
