const express = require("express");
const router = express.Router();

const validate = require("../middleware/validation.middleware");
const {
  createClientSchema,
  updateClientSchema,
} = require("../validation/client.schema");
const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getClientProjects,
  getClientInvoices,
} = require("../controllers/clients.controller");

router.get("/", getClients);
router.get("/:id", getClient);
router.post("/", validate(createClientSchema), createClient);
router.patch("/:id", validate(updateClientSchema), updateClient);
router.delete("/:id", deleteClient);
router.get("/:id/projects", getClientProjects);
router.get("/:id/invoices", getClientInvoices);

module.exports = router;
