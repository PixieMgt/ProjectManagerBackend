const express = require("express");
const router = express.Router();

const validate = require("../middleware/validation.middleware");
const { createUserSchema } = require("../validation/user.schema");
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

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validate(createUserSchema), createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id/projects", getUserProjects);
router.get("/:id/time-entries", getUserTimeEntries);
router.get("/:id/activities", getUserActivities);
router.get("/:id/tasks", getUserTasks);

module.exports = router;
