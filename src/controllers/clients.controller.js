const {
  getAllClients,
  getClientById,
  createNewClient,
  updateExistingClient,
  deleteExistingClient,
  getAllClientProjects,
  getAllClientInvoices,
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
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateClient(req, res) {
  try {
    const client = await updateExistingClient(req.params.id, req.body);
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

async function deleteClient(req, res) {
  try {
    const client = await deleteExistingClient(req.params.id);
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

async function getClientProjects(req, res) {
  try {
    const projects = await getAllClientProjects(req.params.id);
    if (!projects)
      return res.status(404).json({
        message: `Projects for client with id ${req.params.id} not found`,
      });
    return res.status(200).json({ projects });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getClientInvoices(req, res) {
  try {
    const invoices = await getAllClientInvoices(req.params.id);
    if (!invoices)
      return res.status(404).json({
        message: `Invoices for client with id ${req.params.id} not found`,
      });
    return res.status(200).json({ invoices });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getClientProjects,
  getClientInvoices,
};
