const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.post("/github/connect", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.post("/github/callback", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

module.exports = router;
