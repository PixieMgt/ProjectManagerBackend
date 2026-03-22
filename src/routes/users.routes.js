const express = require("express");
const router = express.Router();

const validate = require("../middleware/validation.middleware");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validation/user.schema");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserProjects,
  getUserTimeEntries,
  getUserActivities,
  getUserTasks,
} = require("../controllers/users.controller");
const {
  requireAuth,
  requireSelfOrAdmin,
  requireAdmin,
} = require("../middleware/authentication.middleware");

router.get("/", requireAuth, requireAdmin, getUsers);
router.get("/:userId", requireAuth, requireSelfOrAdmin, getUser);
router.post(
  "/",
  requireAuth,
  requireAdmin,
  validate(createUserSchema),
  createUser,
);
router.patch(
  "/:userId",
  requireAuth,
  requireAdmin,
  validate(updateUserSchema),
  updateUser,
);
router.delete("/:userId", requireAuth, requireAdmin, deleteUser);
router.get(
  "/:userId/projects",
  requireAuth,
  requireSelfOrAdmin,
  getUserProjects,
);
router.get("/:userId/tasks", requireAuth, requireSelfOrAdmin, getUserTasks);
router.get(
  "/:userId/time-entries",
  requireAuth,
  requireSelfOrAdmin,
  getUserTimeEntries,
);
router.get("/:userId/activities", getUserActivities);

module.exports = router;
