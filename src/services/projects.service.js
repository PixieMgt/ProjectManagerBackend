const {
  findAllProjects,
  findProject,
  insertProject,
  changeProject,
  removeProject,
  findAllProjectMembers,
  insertProjectMember,
  changeProjectMember,
  removeProjectMember,
  findProjectMemberRole,
} = require("../repositories/projects.repository");
const {
  toProjectModel,
  toProjectMemberModel,
} = require("../models/project.model");
const { toTaskModel } = require("../models/task.model");
const { toInvoiceModel } = require("../models/invoice.model");
const { findAllProjectTasks } = require("../repositories/tasks.repository");
const {
  findAllProjectInvoices,
} = require("../repositories/invoices.repository");

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

async function getAllProjectMembers(id) {
  const members = await findAllProjectMembers(id);
  if (members.length === 0) return null;
  return members.map(toProjectMemberModel);
}

async function getProjectMemberRole(projectId, userId) {
  const role = await findProjectMemberRole(projectId, userId);
  return role;
}

async function createNewProjectMember(id, data) {
  const normalized = {
    project_id: id,
    user_id: data.userId,
    role: data.role,
  };
  const member = await insertProjectMember(normalized);
  return toProjectMemberModel(member);
}

async function updateExistingProjectMember(projectId, userId, data) {
  const normalized = {
    role: data.role,
  };
  const member = await changeProjectMember(projectId, userId, normalized);
  if (!member) return null;
  return toProjectMemberModel(member);
}

async function deleteExistingProjectMember(projectId, userId) {
  const member = await removeProjectMember(projectId, userId);
  if (!member) return null;
  return toProjectMemberModel(member);
}

async function getAllProjectTasks(id) {
  const tasks = await findAllProjectTasks(id);
  if (tasks.length === 0) return null;
  return tasks.map(toTaskModel);
}

async function getAllProjectInvoices(id) {
  const invoices = await findAllProjectInvoices(id);
  if (invoices.length === 0) return null;
  return invoices.map(toInvoiceModel);
}

module.exports = {
  getAllProjects,
  getProjectById,
  createNewProject,
  updateExistingProject,
  deleteExistingProject,
  getAllProjectMembers,
  getProjectMemberRole,
  createNewProjectMember,
  updateExistingProjectMember,
  deleteExistingProjectMember,
  getAllProjectTasks,
  getAllProjectInvoices,
};
