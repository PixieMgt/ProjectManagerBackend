const {
  findAllInvoices,
  findInvoice,
  insertInvoice,
  changeInvoice,
  removeInvoice,
} = require("../repositories/invoices.repository");
const { toInvoiceModel } = require("../models/invoice.model");

async function getAllInvoices() {
  const invoices = await findAllInvoices();
  return invoices.map(toInvoiceModel);
}

async function getInvoiceById(id) {
  const invoice = await findInvoice(id);
  if (!invoice) return null;
  return toInvoiceModel(invoice);
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
    client_id: data.clientId,
    project_id: data.projectId,
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

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createNewInvoice,
  updateExistingInvoice,
  deleteExistingInvoice,
};
