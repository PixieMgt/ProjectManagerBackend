const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.patch("/:id", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

module.exports = router;
