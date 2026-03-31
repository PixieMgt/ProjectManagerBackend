const db = require("../config/db");

async function findAllTimeEntries() {
  try {
    const timeEntries = await db("time_entries as te")
      .leftJoin("tasks as t", "te.task_id", "t.id")
      .leftJoin("projects as p", "t.project_id", "p.id")
      .leftJoin("users as u", "te.user_id", "u.id")
      .select(
        "te.id as time_entry_id",
        "te.comment as time_entry_comment",
        "te.date as time_entry_date",
        "te.start_time as time_entry_start_time",
        "te.end_time as time_entry_end_time",
        "te.duration_minutes as time_entry_duration_minutes",
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
        "u.id as user_id",
        "u.name as user_name",
      );
    return timeEntries;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findTimeEntry(id) {
  try {
    const [row] = await db("time_entries as te")
      .where({ "te.id": id })
      .leftJoin("tasks as t", "te.task_id", "t.id")
      .leftJoin("projects as p", "t.project_id", "p.id")
      .leftJoin("users as u", "te.user_id", "u.id")
      .select(
        "te.id as time_entry_id",
        "te.comment as time_entry_comment",
        "te.date as time_entry_date",
        "te.start_time as time_entry_start_time",
        "te.end_time as time_entry_end_time",
        "te.duration_minutes as time_entry_duration_minutes",
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
        "u.id as user_id",
        "u.name as user_name",
      );
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function insertTimeEntry(data) {
  try {
    const [row] = await db("time_entries").insert(data).returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function changeTimeEntry(id, data) {
  try {
    const [row] = await db("time_entries")
      .where({ id })
      .update(data)
      .returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function removeTimeEntry(id) {
  try {
    const [row] = await db("time_entries")
      .where({ id })
      .delete()
      .returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllUserTimeEntries(id) {
  try {
    const timeEntries = await db("time_entries as te")
      .where({ "te.user_id": id })
      .leftJoin("tasks as t", "te.task_id", "t.id")
      .leftJoin("projects as p", "t.project_id", "p.id")
      .leftJoin("users as u", "te.user_id", "u.id")
      .select(
        "te.id as time_entry_id",
        "te.comment as time_entry_comment",
        "te.date as time_entry_date",
        "te.start_time as time_entry_start_time",
        "te.end_time as time_entry_end_time",
        "te.duration_minutes as time_entry_duration_minutes",
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
        "u.id as user_id",
        "u.name as user_name",
      );
    return timeEntries;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllTaskTimeEntries(id) {
  try {
    const timeEntries = await db("time_entries as te")
      .where({ "te.task_id": id })
      .leftJoin("users as u", "te.user_id", "u.id")
      .select(
        "te.id as time_entry_id",
        "te.comment as time_entry_comment",
        "te.date as time_entry_date",
        "te.start_time as time_entry_start_time",
        "te.end_time as time_entry_end_time",
        "te.duration_minutes as time_entry_duration_minutes",
        "u.id as user_id",
        "u.name as user_name",
      );
    return timeEntries;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllTimeEntries,
  findTimeEntry,
  insertTimeEntry,
  changeTimeEntry,
  removeTimeEntry,
  findAllUserTimeEntries,
  findAllTaskTimeEntries,
};
