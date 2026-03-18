const express = require("express");
const router = express.Router();
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
router.post("/", createClient);
router.patch("/:id", updateClient);
router.delete("/:id", deleteClient);
router.get("/:id/projects", getProjectsByClientId);
router.get("/:id/invoices", getInvoicesByClientId);

module.exports = router;
