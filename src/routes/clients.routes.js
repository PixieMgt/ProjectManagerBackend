const express = require("express");
const router = express.Router();

const validate = require("../middleware/validation.middleware");
const { createClientSchema } = require("../validation/client.schema");
const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getProjectsByClientId,
  getInvoicesByClientId,
} = require("../controllers/clients.controller");

router.get("/", getClients);
router.get("/:id", getClient);
router.post("/", validate(createClientSchema), createClient);
router.patch("/:id", updateClient);
router.delete("/:id", deleteClient);
router.get("/:id/projects", getProjectsByClientId);
router.get("/:id/invoices", getInvoicesByClientId);

module.exports = router;
