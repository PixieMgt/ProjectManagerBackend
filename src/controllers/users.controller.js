const {
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
  searchUserById,
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

async function searchUser(req, res) {
  const email = req.query.email?.trim();
  const id = req.query.id?.trim();
  if (!email && !id) return res.json([]);

  try {
    let user;
    if (email) user = await searchUserByEmail(email);
    if (id) user = await searchUserById(id);
    if (!user)
      return res
        .status(404)
        .json({ message: `User with e-mail ${email} not found` });
    return res.status(200).json({ user });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getUser(req, res) {
  try {
    const user = await getUserById(req.params.userId);
    if (!user)
      return res
        .status(404)
        .json({ message: `User with id ${req.params.userId} not found` });
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
    const user = await updateExistingUser(req.params.userId, req.body);
    if (!user)
      return res
        .status(404)
        .json({ message: `User with id ${req.params.userId} not found` });
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
    const user = await deleteExistingUser(req.params.userId);
    if (!user)
      return res
        .status(404)
        .json({ message: `User with id ${req.params.userId} not found` });
    return res.status(200).json({ user });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserProjects(req, res) {
  try {
    const projects = await getAllUserProjects(req.params.userId);
    if (!projects)
      return res.status(404).json({
        message: `Projects for user with id ${req.params.userId} not found`,
      });
    return res.status(200).json({ projects });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserTimeEntries(req, res) {
  try {
    const timeEntries = await getAllUserTimeEntries(req.params.userId);
    if (!timeEntries)
      return res.status(404).json({
        message: `Time entries for user with id ${req.params.userId} not found`,
      });
    return res.status(200).json({ timeEntries });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserTasks(req, res) {
  try {
    const tasks = await getAllUserTasks(req.params.userId);
    if (!tasks)
      return res.status(404).json({
        message: `Tasks for user with id ${req.params.userId} not found`,
      });
    return res.status(200).json({ tasks });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserClients(req, res) {
  try {
    const clients = await getAllUserClients(req.params.userId);
    if (!clients)
      return res.status(404).json({
        message: `Clients for user with id ${req.params.userId} not found`,
      });
    return res.status(200).json({ clients });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
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

module.exports = {
  getUsers,
  getUser,
  searchUser,
  createUser,
  updateUser,
  deleteUser,
  getUserProjects,
  getUserTimeEntries,
  getUserActivities,
  getUserTasks,
  getUserClients,
};
