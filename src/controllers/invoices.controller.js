const {
  getAllInvoices,
  getInvoiceById,
  createNewInvoice,
  updateExistingInvoice,
  deleteExistingInvoice,
} = require("../services/invoices.service");

async function getInvoices(req, res) {
  try {
    const invoices = await getAllInvoices();
    return res.status(200).json({ invoices });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getInvoice(req, res) {
  try {
    const invoice = await getInvoiceById(req.params.id);
    if (!invoice)
      return res
        .status(404)
        .json({ message: `Invoice with id ${req.params.id} not found` });
    return res.status(200).json({ invoice });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createInvoice(req, res) {
  try {
    const invoice = await createNewInvoice(req.body);
    return res.status(200).json({ invoice });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateInvoice(req, res) {
  try {
    const invoice = await updateExistingInvoice(req.params.id, req.body);
    if (!invoice)
      return res
        .status(404)
        .json({ message: `Invoice with id ${req.params.id} not found` });
    return res.status(200).json({ invoice });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteInvoice(req, res) {
  try {
    const invoice = await deleteExistingInvoice(req.params.id);
    if (!invoice)
      return res
        .status(404)
        .json({ message: `Invoice with id ${req.params.id} not found` });
    return res.status(200).json({ invoice });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getInvoiceItems(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateInvoiceItem(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteInvoiceItem(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceItems,
  updateInvoiceItem,
  deleteInvoiceItem,
};
