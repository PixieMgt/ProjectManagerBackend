const db = require("../config/db");

async function findAllTasks() {
  try {
    const tasks = await db("tasks").select("*");
    return tasks;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findTask(id) {
  try {
    const [row] = await db("tasks").where({ id }).select("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function insertTask(data) {
  try {
    const [row] = await db("tasks").insert(data).returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function changeTask(id, data) {
  try {
    const [row] = await db("tasks").where({ id }).update(data).returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function removeTask(id) {
  try {
    const [row] = await db("tasks").where({ id }).delete().returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllTasks,
  findTask,
  insertTask,
  changeTask,
  removeTask,
};
