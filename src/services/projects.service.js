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
const { findUser } = require("../repositories/users.repository");
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
const {
  findAllTaskTimeEntries,
} = require("../repositories/time-entries.repository");
const { findTask } = require("../repositories/tasks.repository");
const { toTimeEntryModel } = require("../models/time-entry.model");

async function getAllProjects() {
  const projects = await findAllProjects();
  return projects.map(toProjectModel);
}

async function getProjectById(id) {
  const project = await findProject(id);
  if (!project) return null;
  const tasks = await getAllProjectTasks(id);
  const timeEntries = await getAllProjectTimeEntries(id);
  return {
    project: toProjectModel(project, tasks, timeEntries),
    tasks,
    timeEntries,
  };
}

async function getProjectByTaskId(taskId) {
  const task = await findTask(taskId);
  if (!task) return null;
  return await getProjectById(task.project_id);
}

async function createNewProject(userId, data) {
  const normalized = {
    client_id: data.clientId,
    owner_user_id: userId,
    name: data.name,
    description: data.description,
    status: data.status,
    hourly_rate: data.hourlyRate,
    start_date: data.startDate,
    deadline: data.deadline,
  };
  const project = await insertProject(normalized);
  await insertProjectMember({
    project_id: project.id,
    user_id: userId,
    role: "owner",
  });
  return toProjectModel(project);
}

async function updateExistingProject(id, data) {
  const normalized = {
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
  const membersWithUserData = await Promise.all(
    members.map(async (m) => {
      const user = await findUser(m.user_id);
      return {
        ...m,
        name: user.name,
      };
    }),
  );
  return membersWithUserData.map(toProjectMemberModel);
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

async function getAllProjectTimeEntries(id) {
  const tasks = await findAllProjectTasks(id);
  if (tasks.length === 0) return null;
  const timeEntries = await Promise.all(
    tasks.map((task) => findAllTaskTimeEntries(task.task_id)),
  );
  const flatTimeEntries = timeEntries.flat().filter(Boolean);
  if (flatTimeEntries.length === 0) return null;
  return flatTimeEntries.map(toTimeEntryModel);
}

async function getAllProjectInvoices(id) {
  const invoices = await findAllProjectInvoices(id);
  if (invoices.length === 0) return null;
  return invoices.map(toInvoiceModel);
}

module.exports = {
  getAllProjects,
  getProjectById,
  getProjectByTaskId,
  createNewProject,
  updateExistingProject,
  deleteExistingProject,
  getAllProjectMembers,
  getProjectMemberRole,
  createNewProjectMember,
  updateExistingProjectMember,
  deleteExistingProjectMember,
  getAllProjectTasks,
  getAllProjectTimeEntries,
  getAllProjectInvoices,
};
