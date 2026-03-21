const {
  findAllClients,
  findClient,
  insertClient,
  changeClient,
  removeClient,
} = require("../repositories/clients.repository");
const {
  findAllClientProjects,
} = require("../repositories/projects.repository");
const {
  findAllClientInvoices,
} = require("../repositories/invoices.repository");
const { toClientModel } = require("../models/client.model");
const { toProjectModel } = require("../models/project.model");
const { toInvoiceModel } = require("../models/invoice.model");

async function getAllClients() {
  const clients = await findAllClients();
  return clients.map(toClientModel);
}

async function getClientById(id) {
  const client = await findClient(id);
  if (!client) return null;
  return toClientModel(client);
}

async function createNewClient(data) {
  const normalized = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    notes: data.notes,
  };
  const client = await insertClient(data);
  return toClientModel(client);
}

async function updateExistingClient(id, data) {
  const client = await changeClient(id, data);
  if (!client) return null;
  return toClientModel(client);
}

async function deleteExistingClient(id) {
  const client = await removeClient(id);
  if (!client) return null;
  return toClientModel(client);
}

async function getAllClientProjects(id) {
  const projects = await findAllClientProjects(id);
  if (projects.length === 0) return null;
  return projects.map(toProjectModel);
}

async function getAllClientInvoices(id) {
  const invoices = await findAllClientInvoices(id);
  if (invoices.length === 0) return null;
  return invoices.map(toInvoiceModel);
}

module.exports = {
  getAllClients,
  getClientById,
  createNewClient,
  updateExistingClient,
  deleteExistingClient,
  getAllClientProjects,
  getAllClientInvoices,
};
