const express = require("express");
const router = express.Router();
const { getCommit } = require("../controllers/commits.controller");

router.get("/:id", getCommit);

module.exports = router;
