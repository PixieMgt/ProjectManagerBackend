const express = require("express");
const router = express.Router();

const validate = require("../middleware/validation.middleware");
const {
  createInvoiceSchema,
  updateInvoiceSchema,
  createInvoiceItemSchema,
  updateInvoiceItemSchema,
} = require("../validation/invoice.schema");
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceItems,
  createInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
} = require("../controllers/invoices.controller");
const {
  requireAuth,
  requireAdmin,
  requireMinProjectRole,
  requireClientOwner,
} = require("../middleware/authentication.middleware");

router.get("/", requireAuth, requireAdmin, getInvoices);
router.get(
  "/:invoiceId",
  requireAuth,
  requireMinProjectRole("owner"),
  getInvoice,
);
router.post(
  "/",
  requireAuth,
  requireClientOwner,
  requireMinProjectRole("owner"),
  validate(createInvoiceSchema),
  createInvoice,
);
router.patch(
  "/:invoiceId",
  requireAuth,
  requireMinProjectRole("owner"),
  validate(updateInvoiceSchema),
  updateInvoice,
);
router.delete(
  "/:invoiceId",
  requireAuth,
  requireMinProjectRole("owner"),
  deleteInvoice,
);
router.get("/:invoiceId/items", requireAuth, getInvoiceItems);
router.post(
  "/:invoiceId/items",
  requireAuth,
  requireClientOwner,
  requireMinProjectRole("owner"),
  validate(createInvoiceItemSchema),
  createInvoiceItem,
);
router.patch(
  "/:invoiceId/items/:itemId",
  requireAuth,
  requireMinProjectRole("owner"),
  validate(updateInvoiceItemSchema),
  updateInvoiceItem,
);
router.delete(
  "/:invoiceId/items/:itemId",
  requireAuth,
  requireMinProjectRole("owner"),
  deleteInvoiceItem,
);

module.exports = router;
