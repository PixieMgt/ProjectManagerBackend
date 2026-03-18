const express = require("express");
const router = express.Router();
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceItems,
  updateInvoiceItem,
  deleteInvoiceItem,
} = require("../controllers/invoices.controller");

router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.post("/", createInvoice);
router.patch("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);
router.get("/:id/items", getInvoiceItems);
router.patch("/:invoiceId/items/:itemId", updateInvoiceItem);
router.delete("/:invoiceId/items/:itemId", deleteInvoiceItem);

module.exports = router;
