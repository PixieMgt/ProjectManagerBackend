const db = require("../config/db");

async function findAllUsers() {
  try {
    return await db("users").select("*");
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findUser(id) {
  try {
    return await db("users").where({ id }).first();
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function insertUser(data) {
  try {
    const [row] = await db("users").insert(data).returning("*");
    return row;
  } catch (e) {
    // Duplicate e-mail error codes for MSSQL
    if (e.number === 2627 || e.number === 2601) {
      throw new Error("EMAIL_IN_USE");
    }

    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function changeUser(id, data) {
  try {
    const [row] = await db("users").where({ id }).update(data).returning("*");
    return row;
  } catch (e) {
    // Duplicate e-mail error codes for MSSQL
    if (e.number === 2627 || e.number === 2601) {
      throw new Error("EMAIL_IN_USE");
    }

    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function removeUser(id) {
  try {
    const [row] = await db("users").where({ id }).delete().returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllUsers,
  findUser,
  insertUser,
  changeUser,
  removeUser,
};
