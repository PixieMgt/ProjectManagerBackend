const {
  getAllInvoices,
  getInvoiceById,
  createNewInvoice,
  updateExistingInvoice,
  deleteExistingInvoice,
  getAllInvoiceItems,
  createNewInvoiceItem,
  updateExistingInvoiceItem,
  deleteExistingInvoiceItem,
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
    const invoiceItems = await getAllInvoiceItems(req.params.id);
    if (!invoiceItems)
      return res.status(404).json({
        message: `Invoice items for invoice with id ${req.params.id} not found`,
      });
    return res.status(200).json({ invoiceItems });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createInvoiceItem(req, res) {
  try {
    const invoiceItem = await createNewInvoiceItem(req.params.id, req.body);
    return res.status(200).json({ invoiceItem });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateInvoiceItem(req, res) {
  try {
    const invoiceItem = await updateExistingInvoiceItem(
      req.params.itemId,
      req.body,
    );
    if (!invoiceItem)
      return res.status(404).json({
        message: `Invoice with id ${req.params.itemId} not found`,
      });
    return res.status(200).json({ invoiceItem });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteInvoiceItem(req, res) {
  try {
    const invoiceItem = await deleteExistingInvoiceItem(req.params.itemId);
    if (!invoiceItem)
      return res.status(404).json({
        message: `Invoice with id ${req.params.itemId} not found`,
      });
    return res.status(200).json({ invoiceItem });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceItems,
  createInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
};
