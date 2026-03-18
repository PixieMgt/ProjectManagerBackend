const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.post("/login", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.post("/logout", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.get("/me", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.post("/refresh", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

module.exports = router;
