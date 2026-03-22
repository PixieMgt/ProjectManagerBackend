const express = require("express");
const router = express.Router();

const validate = require("../middleware/validation.middleware");
const {
  createTimeEntrySchema,
  updateTimeEntrySchema,
} = require("../validation/time-entry.schema");
const {
  getTimeEntries,
  getTimeEntry,
  createTimeEntry,
  updateTimeEntry,
  deleteTimeEntry,
} = require("../controllers/time-entries.controller");
const {
  requireAuth,
  requireAdmin,
  requireMinProjectRole,
} = require("../middleware/authentication.middleware");

router.get("/", requireAuth, requireAdmin, getTimeEntries);
router.get(
  "/:timeEntryId",
  requireAuth,
  requireMinProjectRole("viewer"),
  getTimeEntry,
);
router.post(
  "/",
  requireAuth,
  requireMinProjectRole("tester"),
  validate(createTimeEntrySchema),
  createTimeEntry,
);
router.patch(
  "/:timeEntryId",
  requireAuth,
  requireMinProjectRole("tester"),
  validate(updateTimeEntrySchema),
  updateTimeEntry,
);
router.delete(
  "/:timeEntryId",
  requireAuth,
  requireMinProjectRole("owner"),
  deleteTimeEntry,
);

module.exports = router;
