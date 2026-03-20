const {
  findAllProjects,
  findProject,
} = require("../repositories/projects.repository");
const { toProjectModel } = require("../models/project.model");

async function getAllProjects() {
  const projects = await findAllProjects();
  return projects.map(toProjectModel);
}

async function getProjectById(id) {
  const project = await findProject(id);
  if (!project) return null;
  return toProjectModel(project);
}

module.exports = {
  getAllProjects,
  getProjectById,
};
