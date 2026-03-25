const bcrypt = require("bcrypt");

const {
  findAllUsers,
  findUser,
  findUserByEmail,
  insertUser,
  changeUser,
  removeUser,
} = require("../repositories/users.repository");
const { findAllUserProjects } = require("../repositories/projects.repository");
const {
  findAllUserTimeEntries,
} = require("../repositories/time-entries.repository");
const { findAllUserTasks } = require("../repositories/tasks.repository");
const { toUserModel, toUserSearchModel } = require("../models/user.model");
const { toProjectModel } = require("../models/project.model");
const { toTimeEntryModel } = require("../models/time-entry.model");
const { toTaskModel } = require("../models/task.model");
const { findAllUserClients } = require("../repositories/clients.repository");
const { toClientModel } = require("../models/client.model");

async function getAllUsers() {
  const users = await findAllUsers();
  return users.map(toUserModel);
}

async function searchUserByEmail(email) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  return toUserSearchModel(user);
}

async function getUserById(id) {
  const user = await findUser(id);
  if (!user) return null;
  return toUserModel(user);
}

async function createNewUser(data) {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const normalized = {
    name: data.name,
    email: data.email,
    password_hash: passwordHash,
    role: data.role,
  };
  const user = await insertUser(normalized);
  return toUserModel(user);
}

async function updateExistingUser(id, data) {
  const normalized = {
    name: data.name,
    email: data.email,
    role: data.role,
  };

  if (data.password)
    normalized.password_hash = await bcrypt.hash(data.password, 10);

  const user = await changeUser(id, normalized);
  if (!user) return null;
  return toUserModel(user);
}

async function deleteExistingUser(id) {
  const user = await removeUser(id);
  if (!user) return null;
  return toUserModel(user);
}

async function getAllUserProjects(id) {
  const projects = await findAllUserProjects(id);
  if (projects.length === 0) return null;
  return projects.map(toProjectModel);
}

async function getAllUserTimeEntries(id) {
  const timeEntries = await findAllUserTimeEntries(id);
  if (timeEntries.length === 0) return null;
  return timeEntries.map(toTimeEntryModel);
}

async function getAllUserTasks(id) {
  const tasks = await findAllUserTasks(id);
  if (tasks.length === 0) return null;
  return tasks.map(toTaskModel);
}

async function getAllUserClients(id) {
  const clients = await findAllUserClients(id);
  if (clients.length === 0) return null;
  return clients.map(toClientModel);
}

module.exports = {
  getAllUsers,
  getUserById,
  searchUserByEmail,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
  getAllUserProjects,
  getAllUserTimeEntries,
  getAllUserTasks,
  getAllUserClients,
};
