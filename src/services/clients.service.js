const {
  findAllClients,
  findClient,
  insertClient,
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
  const client = await insertClient(data);
  return toClientModel(client);
}

module.exports = {
  getAllClients,
  getClientById,
  createNewClient,
};
