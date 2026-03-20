const {
  getAllTasks,
  getTaskById,
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
} = require("../services/tasks.service");

async function getTasks(req, res) {
  try {
    const tasks = await getAllTasks();
    return res.status(200).json({ tasks });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getTask(req, res) {
  try {
    const task = await getTaskById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ message: `Task with id ${req.params.id} not found` });
    return res.status(200).json({ task });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createTask(req, res) {
  try {
    const task = await createNewTask(req.body);
    return res.status(200).json({ task });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateTask(req, res) {
  try {
    const task = await updateExistingTask(req.params.id, req.body);
    if (!task)
      return res
        .status(404)
        .json({ message: `Task with id ${req.params.id} not found` });
    return res.status(200).json({ task });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteTask(req, res) {
  try {
    const task = await deleteExistingTask(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ message: `Task with id ${req.params.id} not found` });
    return res.status(200).json({ task });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getTaskTimeEntries(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getTaskCommits(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createTaskCommit(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteTaskCommit(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskTimeEntries,
  getTaskCommits,
  createTaskCommit,
  deleteTaskCommit,
};
