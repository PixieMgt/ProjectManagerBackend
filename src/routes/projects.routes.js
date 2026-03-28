const express = require("express");
const router = express.Router();

const validate = require("../middleware/validation.middleware");
const {
  createProjectSchema,
  updateProjectSchema,
  createProjectMemberSchema,
  updateProjectMemberSchema,
} = require("../validation/project.schema");
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectMembers,
  createProjectMember,
  updateProjectMember,
  deleteProjectMember,
  getProjectTasks,
  getProjectTimeEntries,
  getProjectActivities,
  getProjectDocuments,
  getProjectDeployments,
  getProjectInvoices,
  getProjectRepositories,
  createProjectRepository,
  deleteProjectRepository,
} = require("../controllers/projects.controller");
const {
  requireAuth,
  requireAdmin,
  requireMinProjectRole,
  requireClientOwner,
} = require("../middleware/authentication.middleware");

router.get("/", requireAuth, requireAdmin, getProjects);
router.get(
  "/:projectId",
  requireAuth,
  requireMinProjectRole("viewer"),
  getProject,
);
router.post(
  "/",
  requireAuth,
  requireClientOwner,
  validate(createProjectSchema),
  createProject,
);
router.patch(
  "/:projectId",
  requireAuth,
  requireMinProjectRole("developer"),
  validate(updateProjectSchema),
  updateProject,
);
router.delete(
  "/:projectId",
  requireAuth,
  requireMinProjectRole("owner"),
  deleteProject,
);
router.get(
  "/:projectId/members",
  requireAuth,
  requireMinProjectRole("viewer"),
  getProjectMembers,
);
router.post(
  "/:projectId/members",
  requireAuth,
  requireMinProjectRole("owner"),
  validate(createProjectMemberSchema),
  createProjectMember,
);
router.patch(
  "/:projectId/members/:userId",
  requireAuth,
  requireMinProjectRole("owner"),
  validate(updateProjectMemberSchema),
  updateProjectMember,
);
router.delete(
  "/:projectId/members/:userId",
  requireAuth,
  requireMinProjectRole("owner"),
  deleteProjectMember,
);
router.get(
  "/:projectId/tasks",
  requireAuth,
  requireMinProjectRole("viewer"),
  getProjectTasks,
);
router.get(
  "/:projectId/time-entries",
  requireAuth,
  requireMinProjectRole("viewer"),
  getProjectTimeEntries,
);
router.get(
  "/:projectId/invoices",
  requireAuth,
  requireMinProjectRole("owner"),
  getProjectInvoices,
);
router.get("/:projectId/activities", getProjectActivities);
router.get("/:projectId/documents", getProjectDocuments);
router.get("/:projectId/deployments", getProjectDeployments);
router.get("/:projectId/repositories", getProjectRepositories);
router.post("/:projectId/repositories", createProjectRepository);
router.delete("/:projectId/repositories/:repoId", deleteProjectRepository);

module.exports = router;
