const express = require("express");
const router = express.Router();

const validate = require("../middleware/validation.middleware");
const {
  createInvoiceSchema,
  updateInvoiceSchema,
} = require("../validation/invoice.schema");
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
router.post("/", validate(createInvoiceSchema), createInvoice);
router.patch("/:id", validate(updateInvoiceSchema), updateInvoice);
router.delete("/:id", deleteInvoice);
router.get("/:id/items", getInvoiceItems);
router.patch("/:invoiceId/items/:itemId", updateInvoiceItem);
router.delete("/:invoiceId/items/:itemId", deleteInvoiceItem);

module.exports = router;
