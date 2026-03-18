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

router.get("/:id/members", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.post("/:id/members", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.patch("/:projectId/members/:userId", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.delete("/:projectId/members/:userId", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.get("/:id/tasks", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.get("/:id/activities", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.get("/:id/docs", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.get("/:id/deployments", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.get("/:id/invoices", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.get("/:id/repositories", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.post("/:id/repositories", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

router.delete("/:projectId/repositories/:repoId", (req, res) => {
  res.status(200).json({ message: "under construction" });
});

module.exports = router;
