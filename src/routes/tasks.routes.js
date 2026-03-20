const express = require("express");
const router = express.Router();

const validate = require("../middleware/validation.middleware");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validation/task.schema");
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
router.post("/", validate(createTaskSchema), createTask);
router.patch("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);
router.get("/:id/time-entries", getTaskTimeEntries);
router.get("/:id/commits", getTaskCommits);
router.post("/:id/commits", createTaskCommit);
router.delete(":taskId/commits/:commitId", deleteTaskCommit);

module.exports = router;
