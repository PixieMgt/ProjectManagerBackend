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
const {
  requireAuth,
  requireAdmin,
  requireClientOwner,
} = require("../middleware/authentication.middleware");

router.get("/", requireAuth, requireAdmin, getClients);
router.get("/:clientId", requireAuth, requireClientOwner, getClient);
router.post("/", requireAuth, validate(createClientSchema), createClient);
router.patch(
  "/:clientId",
  requireAuth,
  requireClientOwner,
  validate(updateClientSchema),
  updateClient,
);
router.delete("/:clientId", requireAuth, requireClientOwner, deleteClient);
router.get(
  "/:clientId/projects",
  requireAuth,
  requireClientOwner,
  getClientProjects,
);
router.get(
  "/:clientId/invoices",
  requireAuth,
  requireClientOwner,
  getClientInvoices,
);

module.exports = router;
