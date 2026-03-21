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

async function changeProject(id, data) {
  try {
    const [row] = await db("projects")
      .where({ id })
      .update(data)
      .returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function removeProject(id) {
  try {
    const [row] = await db("projects").where({ id }).delete().returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllUserProjects(id) {
  try {
    const projects = await db("projects")
      .where({ owner_user_id: id })
      .select("*");
    return projects;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllClientProjects(id) {
  try {
    const projects = await db("projects").where({ client_id: id }).select("*");
    return projects;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllProjects,
  findProject,
  insertProject,
  changeProject,
  removeProject,
  findAllUserProjects,
  findAllClientProjects,
};
