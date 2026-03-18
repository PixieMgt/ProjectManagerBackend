const express = require("express");
const router = express.Router();
const {
  getIntegrations,
  deleteIntegration,
  githubConnect,
  githubCallback,
} = require("../controllers/integrations.controller");

router.get("/", getIntegrations);
router.delete("/:id", deleteIntegration);
router.post("/github/connect", githubConnect);
router.post("/github/callback", githubCallback);

module.exports = router;
