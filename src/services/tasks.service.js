const {
  findAllTasks,
  findTask,
  insertTask,
  changeTask,
  removeTask,
} = require("../repositories/tasks.repository");
const { toTaskModel } = require("../models/task.model");

async function getAllTasks() {
  const tasks = await findAllTasks();
  return tasks.map(toTaskModel);
}

async function getTaskById(id) {
  const task = await findTask(id);
  if (!task) return null;
  return toTaskModel(task);
}

async function createNewTask(data) {
  const normalized = {
    project_id: data.projectId,
    owner_user_id: data.ownerUserId,
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    estimated_hours: data.estimated_hours,
  };
  const task = await insertTask(normalized);
  return task;
}

async function updateExistingTask(id, data) {
  const normalized = {
    project_id: data.projectId,
    owner_user_id: data.ownerUserId,
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    estimated_hours: data.estimated_hours,
  };
  const task = await changeTask(id, normalized);
  if (!task) return null;
  return task;
}

async function deleteExistingTask(id) {
  const task = await removeTask(id);
  if (!task) return null;
  return task;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
};
