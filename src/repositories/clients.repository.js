const db = require("../config/db");

async function findAllClients() {
  try {
    const clients = await db("clients as c")
      .whereNull("c.deleted_at")
      .leftJoin("users as u", "c.owner_user_id", "u.id")
      .select(
        "c.id as client_id",
        "c.name as client_name",
        "c.email as client_email",
        "c.phone as client_phone",
        "c.notes as client_notes",
        "u.id as owner_user_id",
        "u.name as owner_user_name",
      );
    return clients;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findClient(id) {
  try {
    const [row] = await db("clients as c")
      .where({ "c.id": id })
      .leftJoin("users as u", "c.owner_user_id", "u.id")
      .select(
        "c.id as client_id",
        "c.name as client_name",
        "c.email as client_email",
        "c.phone as client_phone",
        "c.notes as client_notes",
        "u.id as owner_user_id",
        "u.name as owner_user_name",
      );
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
    const [row] = await db("clients")
      .where({ id })
      .update({ deleted_at: new Date() })
      .returning("*");
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
      .whereNull("deleted_at")
      .select(
        "id as client_id",
        "name as client_name",
        "email as client_email",
        "phone as client_phone",
        "notes as client_notes",
      );
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
