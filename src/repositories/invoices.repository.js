const db = require("../config/db");

async function findAllInvoices() {
  try {
    const invoices = await db("invoices as i")
      .leftJoin("clients as c", "i.client_id", "c.id")
      .leftJoin("projects as p", "i.project_id", "p.id")
      .select(
        "i.id as invoice_id",
        "i.status as invoice_status",
        "i.issue_date as invoice_issue_date",
        "i.due_date as invoice_due_date",
        "i.total_amount as invoice_total_amount",
        "c.id as client_id",
        "c.name as client_name",
        "c.email as client_email",
        "c.phone as client_phone",
        "c.notes as client_notes",
        "p.id as project_id",
        "p.name as project_name",
        "p.description as project_description",
        "p.status as project_status",
        "p.hourly_rate as project_hourly_rate",
        "p.start_date as project_start_date",
        "p.deadline as project_deadline",
      );
    return invoices;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findInvoice(id) {
  try {
    const [row] = await db("invoices as i")
      .where({ "i.id": id })
      .leftJoin("clients as c", "i.client_id", "c.id")
      .leftJoin("projects as p", "i.project_id", "p.id")
      .select(
        "i.id as invoice_id",
        "i.status as invoice_status",
        "i.issue_date as invoice_issue_date",
        "i.due_date as invoice_due_date",
        "i.total_amount as invoice_total_amount",
        "c.id as client_id",
        "c.name as client_name",
        "c.email as client_email",
        "c.phone as client_phone",
        "c.notes as client_notes",
        "p.id as project_id",
        "p.name as project_name",
        "p.description as project_description",
        "p.status as project_status",
        "p.hourly_rate as project_hourly_rate",
        "p.start_date as project_start_date",
        "p.deadline as project_deadline",
      );
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
    const [row] = await db("invoices")
      .where({ id })
      .update({ deleted_at: new Date() })
      .returning("*");
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
      .select(
        "id as invoice_item_id",
        "description as invoice_item_description",
        "quantity as invoice_item_quantity",
        "unit_price as invoice_item_unit_price",
        "total as invoice_item_total",
      );
    console.log(invoiceItems);
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
    const invoices = await db("invoices as i")
      .where({ "i.client_id": id })
      .leftJoin("projects as p", "i.project_id", "p.id")
      .select(
        "i.id as invoice_id",
        "i.status as invoice_status",
        "i.issue_date as invoice_issue_date",
        "i.due_date as invoice_due_date",
        "i.total_amount as invoice_total_amount",
        "p.id as project_id",
        "p.name as project_name",
        "p.description as project_description",
        "p.status as project_status",
        "p.hourly_rate as project_hourly_rate",
        "p.start_date as project_start_date",
        "p.deadline as project_deadline",
      );
    return invoices;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllProjectInvoices(id) {
  try {
    const invoices = await db("invoices")
      .where({ project_id: id })
      .select(
        "id as invoice_id",
        "status as invoice_status",
        "issue_date as invoice_issue_date",
        "due_date as invoice_due_date",
        "total_amount as invoice_total_amount",
      );
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
  findAllProjectInvoices,
};
