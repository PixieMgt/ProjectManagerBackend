const {
  getAllClients,
  getClientById,
  createNewClient,
} = require("../services/clients.service");

async function getClients(req, res) {
  try {
    const clients = await getAllClients();
    return res.status(200).json({ clients });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getClient(req, res) {
  try {
    const client = await getClientById(req.params.id);
    if (!client)
      return res
        .status(404)
        .json({ message: `Client with id ${req.params.id} not found` });
    return res.status(200).json({ client });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createClient(req, res) {
  try {
    const client = await createNewClient(req.body);
    return res.status(200).json({ client });
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateClient(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteClient(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectsByClientId(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getInvoicesByClientId(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getProjectsByClientId,
  getInvoicesByClientId,
};
