const express = require("express");
const router = express.Router();
const {
  getDeployments,
  getDeployment,
  createDeployment,
} = require("../controllers/deployments.controller");

router.get("/", getDeployments);
router.get("/:id", getDeployment);
router.post("/", createDeployment);

module.exports = router;
