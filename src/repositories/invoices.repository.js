const db = require("../config/db");

async function findAllInvoices() {
  try {
    const invoices = await db("invoices").select("*");
    return invoices;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findInvoice(id) {
  try {
    const [row] = await db("invoices").where({ id }).select("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function insertInvoice(data) {
  try {
    const [row] = await db("invoices").insert(data).returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function changeInvoice(id, data) {
  try {
    const [row] = await db("invoices")
      .where({ id })
      .update(data)
      .returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function removeInvoice(id) {
  try {
    const [row] = await db("invoices").where({ id }).delete().returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllInvoices,
  findInvoice,
  insertInvoice,
  changeInvoice,
  removeInvoice,
};
