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
  searchUser,
  createUser,
  updateUser,
  deleteUser,
  getUserProjects,
  getUserTimeEntries,
  getUserActivities,
  getUserTasks,
  getUserClients,
} = require("../controllers/users.controller");
const {
  requireAuth,
  requireSelf,
  requireAdmin,
} = require("../middleware/authentication.middleware");

router.get("/", requireAuth, requireAdmin, getUsers);
router.get("/search", requireAuth, searchUser);
router.get("/:userId", requireAuth, requireSelf, getUser);
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
router.get("/:userId/projects", requireAuth, requireSelf, getUserProjects);
router.get("/:userId/tasks", requireAuth, requireSelf, getUserTasks);
router.get(
  "/:userId/time-entries",
  requireAuth,
  requireSelf,
  getUserTimeEntries,
);
router.get("/:userId/clients", requireAuth, requireSelf, getUserClients);
router.get("/:userId/activities", getUserActivities);

module.exports = router;
