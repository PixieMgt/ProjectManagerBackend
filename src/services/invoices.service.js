const {
  findAllInvoices,
  findInvoice,
  insertInvoice,
  changeInvoice,
  removeInvoice,
  findAllInvoiceItems,
  insertInvoiceItem,
  changeInvoiceItem,
  removeInvoiceItem,
} = require("../repositories/invoices.repository");
const {
  toInvoiceModel,
  toInvoiceItemModel,
} = require("../models/invoice.model");

async function getAllInvoices() {
  const invoices = await findAllInvoices();
  return invoices.map(toInvoiceModel);
}

async function getInvoiceById(id) {
  const invoice = await findInvoice(id);
  if (!invoice) return null;
  return toInvoiceModel(invoice);
}

async function getInvoiceProjectId(id) {
  const invoice = getInvoiceById(id);
  if (!invoice) return null;
  return invoice.projectId;
}

async function createNewInvoice(data) {
  const normalized = {
    client_id: data.clientId,
    project_id: data.projectId,
    status: data.status,
    issue_date: data.issueDate,
    due_date: data.dueDate,
  };
  const invoice = await insertInvoice(normalized);
  return toInvoiceModel(invoice);
}

async function updateExistingInvoice(id, data) {
  const normalized = {
    status: data.status,
    issue_date: data.issueDate,
    due_date: data.dueDate,
  };
  const invoice = await changeInvoice(id, normalized);
  if (!invoice) return null;
  return toInvoiceModel(invoice);
}

async function deleteExistingInvoice(id) {
  const invoice = await removeInvoice(id);
  if (!invoice) return null;
  return toInvoiceModel(invoice);
}

async function getAllInvoiceItems(id) {
  const invoiceItems = await findAllInvoiceItems(id);
  return invoiceItems.map(toInvoiceItemModel);
}

async function createNewInvoiceItem(id, data) {
  const normalized = {
    invoice_id: id,
    description: data.description,
    quantity: data.quantity,
    unit_price: data.unitPrice,
  };
  const invoiceItem = await insertInvoiceItem(normalized);
  console.log(invoiceItem);
  console.log(toInvoiceItemModel(invoiceItem));
  return toInvoiceItemModel(invoiceItem);
}

async function updateExistingInvoiceItem(itemId, data) {
  const normalized = {
    description: data.description,
    quantity: data.quantity,
    unit_price: data.unitPrice,
  };
  const invoiceItem = await changeInvoiceItem(itemId, normalized);
  if (!invoiceItem) return null;
  return toInvoiceItemModel(invoiceItem);
}

async function deleteExistingInvoiceItem(id) {
  const invoiceItem = await removeInvoiceItem(id);
  if (!invoiceItem) return null;
  return toInvoiceItemModel(invoiceItem);
}

module.exports = {
  getAllInvoices,
  getInvoiceById,
  getInvoiceProjectId,
  createNewInvoice,
  updateExistingInvoice,
  deleteExistingInvoice,
  getAllInvoiceItems,
  createNewInvoiceItem,
  updateExistingInvoiceItem,
  deleteExistingInvoiceItem,
};
