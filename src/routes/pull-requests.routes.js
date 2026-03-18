const express = require("express");
const router = express.Router();
const { getPullRequest } = require("../controllers/pull-requests.controller");

router.get("/:id", getPullRequest);

module.exports = router;
