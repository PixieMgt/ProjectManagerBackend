const express = require("express");
const router = express.Router();
const {
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} = require("../controllers/documents.controller");

router.get("/:id", getDocument);
router.post("/", createDocument);
router.patch("/:id", updateDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
