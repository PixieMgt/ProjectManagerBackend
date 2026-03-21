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

router.get("/", getTimeEntries);
router.get("/:id", getTimeEntry);
router.post("/", validate(createTimeEntrySchema), createTimeEntry);
router.patch("/:id", validate(updateTimeEntrySchema), updateTimeEntry);
router.delete("/:id", deleteTimeEntry);

module.exports = router;
