const db = require("../config/db");

async function findAllProjects() {
  try {
    return await db("projects").select("*");
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findProject(id) {
  try {
    const [row] = await db("projects").where({ id }).select("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function insertProject(data) {
  try {
    const [row] = await db("projects").insert(data).returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllProjects,
  findProject,
  insertProject,
};
