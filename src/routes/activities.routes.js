const express = require("express");
const router = express.Router();

router.get("/activities", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

module.exports = router;
