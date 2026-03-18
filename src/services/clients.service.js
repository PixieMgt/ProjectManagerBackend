const { findAllClients } = require("../repositories/clients.repository");
const { toClientModel } = require("../models/client.model");

async function getAllClients() {
  const clients = await findAllClients();
  return clients.map(toClientModel);
}

module.exports = {
  getAllClients,
};
