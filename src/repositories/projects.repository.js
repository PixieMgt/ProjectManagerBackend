const db = require("../config/db");

async function findAllProjects() {
  try {
    return await db("projects").select("*");
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllProjects,
};
