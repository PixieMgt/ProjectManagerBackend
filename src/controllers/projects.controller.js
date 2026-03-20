const {
  getAllProjects,
  getProjectById,
  createNewProject,
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
    const project = await getProjectById(req.params.id);
    if (!project)
      return res
        .status(404)
        .json({ message: `Project with id ${req.params.id} not found` });
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
    const project = await createNewProject(req.body);
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
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteProject(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectMembers(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createProjectMember(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateProjectMember(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteProjectMember(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getProjectTasks(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
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

async function getProjectInvoices(req, res) {
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
  getProjectActivities,
  getProjectDocuments,
  getProjectDeployments,
  getProjectInvoices,
  getProjectRepositories,
  createProjectRepository,
  deleteProjectRepository,
};
