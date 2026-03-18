const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateExistingUser,
} = require("../services/users.service");

async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ users });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getUser(req, res) {
  try {
    const user = await getUserById(req.params.id);
    return res.status(200).json({ user });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createUser(req, res) {
  try {
    const user = await createNewUser(req.body);
    return res.status(200).json({ user });
  } catch (e) {
    console.error(e);

    if (e.message === "EMAIL_IN_USE")
      return res.status(400).json({ message: "E-mail already in use" });
    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateUser(req, res) {
  try {
    const user = await updateExistingUser(req.params.id, req.body);
    return res.status(200).json({ user });
  } catch (e) {
    console.error(e);

    if (e.message === "EMAIL_IN_USE")
      return res.status(400).json({ message: "E-mail already in use" });
    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteUser(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserProjects(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserTimeEntries(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserActivities(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserTasks(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserProjects,
  getUserTimeEntries,
  getUserActivities,
  getUserTasks,
};
