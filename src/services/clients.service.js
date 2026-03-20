const {
  findAllClients,
  findClient,
  insertClient,
  changeClient,
  removeClient,
} = require("../repositories/clients.repository");
const { toClientModel } = require("../models/client.model");

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

module.exports = {
  getAllClients,
  getClientById,
  createNewClient,
  updateExistingClient,
  deleteExistingClient,
};
