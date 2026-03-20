const {
  findAllProjects,
  findProject,
  insertProject,
  changeProject,
  removeProject,
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

async function createNewProject(data) {
  const normalized = {
    client_id: data.clientId,
    owner_user_id: data.ownerUserId,
    name: data.name,
    description: data.description,
    status: data.status,
    hourly_rate: data.hourlyRate,
    start_date: data.startDate,
    deadline: data.deadline,
  };
  const project = await insertProject(normalized);
  return toProjectModel(project);
}

async function updateExistingProject(id, data) {
  const normalized = {
    client_id: data.clientId,
    owner_user_id: data.ownerUserId,
    name: data.name,
    description: data.description,
    status: data.status,
    hourly_rate: data.hourlyRate,
    start_date: data.startDate,
    deadline: data.deadline,
  };
  const project = await changeProject(id, normalized);
  return toProjectModel(project);
}

async function deleteExistingProject(id) {
  const project = await removeProject(id);
  if (!project) return null;
  return toProjectModel(project);
}

module.exports = {
  getAllProjects,
  getProjectById,
  createNewProject,
  updateExistingProject,
  deleteExistingProject,
};
