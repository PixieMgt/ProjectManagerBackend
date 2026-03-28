const {
  getAllProjects,
  getProjectById,
  createNewProject,
  updateExistingProject,
  deleteExistingProject,
  getAllProjectMembers,
  createNewProjectMember,
  updateExistingProjectMember,
  deleteExistingProjectMember,
  getAllProjectTasks,
  getAllProjectTimeEntries,
  getAllProjectInvoices,
} = require("../services/projects.service");

async function getProjects(req, res) {
  try {
    const projects = await getAllProjects();
    return res.status(200).json({ projects });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProject(req, res) {
  try {
    const project = await getProjectById(req.params.projectId);
    if (!project)
      return res
        .status(404)
        .json({ message: `Project with id ${req.params.projectId} not found` });
    return res.status(200).json({ project });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createProject(req, res) {
  try {
    const project = await createNewProject(req.user.userId, req.body);
    return res.status(200).json({ project });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateProject(req, res) {
  try {
    const project = await updateExistingProject(req.params.projectId, req.body);
    if (!project)
      return res
        .status(404)
        .json({ message: `Project with id ${req.params.projectId} not found` });
    return res.status(200).json({ project });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteProject(req, res) {
  try {
    const project = await deleteExistingProject(req.params.projectId);
    if (!project)
      return res
        .status(404)
        .json({ message: `Project with id ${req.params.projectId} not found` });
    return res.status(200).json({ project });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectMembers(req, res) {
  try {
    const members = await getAllProjectMembers(req.params.projectId);
    if (!members)
      return res.status(404).json({
        message: `Project members for project with id ${req.params.projectId} not found`,
      });
    return res.status(200).json({ members });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createProjectMember(req, res) {
  try {
    const member = await createNewProjectMember(req.params.projectId, req.body);
    return res.status(200).json({ member });
  } catch (e) {
    console.error(e);

    if (e.message === "PROJECT_MEMBER_ALREADY_EXISTS")
      return res.status(400).json({ message: "Project member already exists" });
    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateProjectMember(req, res) {
  try {
    const member = await updateExistingProjectMember(
      req.params.projectId,
      req.params.userId,
      req.body,
    );
    if (!member)
      return res.status(404).json({
        message: `Project member with userId ${req.params.userId} 
          for project with id ${req.params.projectId} not found`,
      });
    return res.status(200).json({ member });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteProjectMember(req, res) {
  try {
    const member = await deleteExistingProjectMember(
      req.params.projectId,
      req.params.userId,
    );
    if (!member)
      return res.status(404).json({
        message: `Project member with userId ${req.params.userId} 
          for project with id ${req.params.projectId} not found`,
      });
    return res.status(200).json({ member });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectTasks(req, res) {
  try {
    const tasks = await getAllProjectTasks(req.params.projectId);
    if (!tasks)
      return res.status(404).json({
        message: `Tasks for project with id ${req.params.projectId} not found`,
      });
    return res.status(200).json({ tasks });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectTimeEntries(req, res) {
  try {
    const timeEntries = await getAllProjectTimeEntries(req.params.projectId);
    if (!timeEntries)
      return res.status(404).json({
        message: `Time entries for project with id ${req.params.projectId} not found`,
      });
    return res.status(200).json({ timeEntries });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectInvoices(req, res) {
  try {
    const invoices = await getAllProjectInvoices(req.params.projectId);
    if (!invoices)
      return res.status(404).json({
        message: `Invoices for project with id ${req.params.projectId} not found`,
      });
    return res.status(200).json({ invoices });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectActivities(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectDocuments(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectDeployments(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectRepositories(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createProjectRepository(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteProjectRepository(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
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
};
