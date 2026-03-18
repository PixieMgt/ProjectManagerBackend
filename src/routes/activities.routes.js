const express = require("express");
const router = express.Router();
const { getActivities } = require("../controllers/activities.controller.js");

router.get("/", getActivities);

module.exports = router;
