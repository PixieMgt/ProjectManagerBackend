const express = require("express");
const router = express.Router();
const {
  getTimeEntries,
  getTimeEntry,
  createTimeEntry,
  updateTimeEntry,
  deleteTimeEntry,
} = require("../controllers/time-entries.controller");

router.get("/", getTimeEntries);
router.get("/:id", getTimeEntry);
router.post("/", createTimeEntry);
router.patch("/:id", updateTimeEntry);
router.delete("/:id", deleteTimeEntry);

module.exports = router;
