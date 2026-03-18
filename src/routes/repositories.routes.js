const express = require("express");
const router = express.Router();
const {
  getRepositories,
  getRepository,
  createRepository,
  deleteRepository,
  getRepositoryCommits,
  getRepositoryPullRequests,
} = require("../controllers/repositories.controller");

router.get("/", getRepositories);
router.get("/:id", getRepositories);
router.post("/", createRepository);
router.delete("/:id", deleteRepository);
router.get("/:id/commits", getRepositoryCommits);
router.get("/:id/pull-requests", getRepositoryPullRequests);

module.exports = router;
