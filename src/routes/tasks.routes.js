const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

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

router.get("/:id/time-entries", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.get("/:id/commits", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.post("/:id/commits", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.delete(":taskId/commits/:commitId", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

module.exports = router;
