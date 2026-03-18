const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskTimeEntries,
  getTaskCommits,
  createTaskCommit,
  deleteTaskCommit,
} = require("../controllers/tasks.controller");

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/:id/time-entries", getTaskTimeEntries);
router.get("/:id/commits", getTaskCommits);
router.post("/:id/commits", createTaskCommit);
router.delete(":taskId/commits/:commitId", deleteTaskCommit);

module.exports = router;
