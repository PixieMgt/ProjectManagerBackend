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

async function findAllInvoiceItems(id) {
  try {
    const invoiceItems = await db("invoice_items")
      .where({ invoice_id: id })
      .select("*");
    return invoiceItems;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function insertInvoiceItem(data) {
  try {
    const [row] = await db("invoice_items").insert(data).returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function changeInvoiceItem(id, data) {
  try {
    const [row] = await db("invoice_items")
      .where({ id })
      .update(data)
      .returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function removeInvoiceItem(id) {
  try {
    const [row] = await db("invoice_items")
      .where({ id })
      .delete()
      .returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllClientInvoices(id) {
  try {
    const invoices = await db("invoices").where({ client_id: id }).select("*");
    return invoices;
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
  findAllInvoiceItems,
  insertInvoiceItem,
  changeInvoiceItem,
  removeInvoiceItem,
  findAllClientInvoices,
};
