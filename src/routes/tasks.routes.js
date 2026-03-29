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
  getTaskProject,
  getTaskCommits,
  createTaskCommit,
  deleteTaskCommit,
} = require("../controllers/tasks.controller");
const {
  requireAuth,
  requireAdmin,
  requireMinProjectRole,
} = require("../middleware/authentication.middleware");

router.get("/", requireAuth, requireAdmin, getTasks);
router.get("/:taskId", requireAuth, requireMinProjectRole("viewer"), getTask);
router.post(
  "/",
  requireAuth,
  requireMinProjectRole("tester"),
  validate(createTaskSchema),
  createTask,
);
router.patch(
  "/:taskId",
  requireAuth,
  requireMinProjectRole("tester"),
  validate(updateTaskSchema),
  updateTask,
);
router.delete(
  "/:taskId",
  requireAuth,
  requireMinProjectRole("owner"),
  deleteTask,
);
router.get(
  "/:taskId/time-entries",
  requireAuth,
  requireMinProjectRole("viewer"),
  getTaskTimeEntries,
);
router.get(
  "/:taskId/project",
  requireAuth,
  requireMinProjectRole("viewer"),
  getTaskProject,
);
router.get("/:taskId/commits", getTaskCommits);
router.post("/:taskId/commits", createTaskCommit);
router.delete(":taskId/commits/:commitId", deleteTaskCommit);

module.exports = router;
