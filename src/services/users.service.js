const bcrypt = require("bcrypt");

const {
  findAllUsers,
  findUser,
  insertUser,
  changeUser,
  removeUser,
} = require("../repositories/users.repository");
const { toUserModel } = require("../models/user.model");

async function getAllUsers() {
  const users = await findAllUsers();
  return users.map(toUserModel);
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

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
};
