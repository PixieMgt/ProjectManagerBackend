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
  getProjectActivities,
  getProjectDocuments,
  getProjectDeployments,
  getProjectInvoices,
  getProjectRepositories,
  createProjectRepository,
  deleteProjectRepository,
} = require("../controllers/projects.controller");

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", validate(createProjectSchema), createProject);
router.patch("/:id", validate(updateProjectSchema), updateProject);
router.delete("/:id", deleteProject);
router.get("/:id/members", getProjectMembers);
router.post(
  "/:id/members",
  validate(createProjectMemberSchema),
  createProjectMember,
);
router.patch(
  "/:projectId/members/:userId",
  validate(updateProjectMemberSchema),
  updateProjectMember,
);
router.delete("/:projectId/members/:userId", deleteProjectMember);
router.get("/:id/tasks", getProjectTasks);
router.get("/:id/invoices", getProjectInvoices);
router.get("/:id/activities", getProjectActivities);
router.get("/:id/documents", getProjectDocuments);
router.get("/:id/deployments", getProjectDeployments);
router.get("/:id/repositories", getProjectRepositories);
router.post("/:id/repositories", createProjectRepository);
router.delete("/:projectId/repositories/:repoId", deleteProjectRepository);

module.exports = router;
