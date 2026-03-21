const db = require("../config/db");

async function findAllTimeEntries() {
  try {
    const timeEntries = await db("time_entries").select("*");
    return timeEntries;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findTimeEntry(id) {
  try {
    const [row] = await db("time_entries").where({ id }).select("*");
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
    const timeEntries = await db("time_entries")
      .where({ user_id: id })
      .select("*");
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
};
