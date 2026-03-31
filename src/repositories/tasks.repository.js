const db = require("../config/db");

async function findAllTasks() {
  try {
    const tasks = await db("tasks as t")
      .leftJoin("projects as p", "t.project_id", "p.id")
      .leftJoin("users as u", "t.owner_user_id", "u.id")
      .select(
        "t.id as task_id",
        "t.title as task_title",
        "t.description as task_description",
        "t.status as task_status",
        "t.priority as task_priority",
        "t.estimated_hours as task_estimated_hours",
        "p.id as project_id",
        "p.name as project_name",
        "p.description as project_description",
        "p.status as project_status",
        "p.hourly_rate as project_hourly_rate",
        "p.start_date as project_start_date",
        "p.deadline as project_deadline",
        "u.id as owner_user_id",
        "u.name as owner_user_name",
      );
    return tasks;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findTask(id) {
  try {
    const [row] = await db("tasks as t")
      .where({ "t.id": id })
      .leftJoin("projects as p", "t.project_id", "p.id")
      .leftJoin("users as u", "t.owner_user_id", "u.id")
      .select(
        "t.id as task_id",
        "t.title as task_title",
        "t.description as task_description",
        "t.status as task_status",
        "t.priority as task_priority",
        "t.estimated_hours as task_estimated_hours",
        "p.id as project_id",
        "p.name as project_name",
        "p.description as project_description",
        "p.status as project_status",
        "p.hourly_rate as project_hourly_rate",
        "p.start_date as project_start_date",
        "p.deadline as project_deadline",
        "u.id as owner_user_id",
        "u.name as owner_user_name",
      );
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

async function findAllUserTasks(id) {
  try {
    const tasks = await db("tasks as t")
      .where({ "t.owner_user_id": id })
      .leftJoin("projects as p", "t.project_id", "p.id")
      .leftJoin("users as u", "t.owner_user_id", "u.id")
      .select(
        "t.id as task_id",
        "t.title as task_title",
        "t.description as task_description",
        "t.status as task_status",
        "t.priority as task_priority",
        "t.estimated_hours as task_estimated_hours",
        "p.id as project_id",
        "p.name as project_name",
        "p.description as project_description",
        "p.status as project_status",
        "p.hourly_rate as project_hourly_rate",
        "p.start_date as project_start_date",
        "p.deadline as project_deadline",
        "u.id as owner_user_id",
        "u.name as owner_user_name",
      );
    return tasks;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllProjectTasks(id) {
  try {
    const tasks = await db("tasks as t")
      .where({ "t.project_id": id })
      .leftJoin("users as u", "t.owner_user_id", "u.id")
      .select(
        "t.id as task_id",
        "t.title as task_title",
        "t.description as task_description",
        "t.status as task_status",
        "t.priority as task_priority",
        "t.estimated_hours as task_estimated_hours",
        "u.id as owner_user_id",
        "u.name as owner_user_name",
      );
    return tasks;
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
  findAllUserTasks,
  findAllProjectTasks,
};
