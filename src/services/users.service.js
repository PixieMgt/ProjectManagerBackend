const bcrypt = require("bcrypt");

const {
  findAllUsers,
  findUser,
  insertUser,
  changeUser,
} = require("../repositories/users.repository");
const { toUserModel } = require("../models/user.model");

async function getAllUsers() {
  const users = await findAllUsers();
  return users.map(toUserModel);
}

async function getUserById(id) {
  const user = await findUser(id);
  return toUserModel(user);
}

async function createNewUser(data) {
  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await insertUser({
    name: data.name,
    email: data.email,
    password_hash: passwordHash,
    role: data.role,
  });
  return toUserModel(user);
}

async function updateExistingUser(id, data) {
  const updateData = {
    name: data.name,
    email: data.email,
    role: data.role,
  };

  if (data.password)
    updateData.password_hash = await bcrypt.hash(data.password, 10);

  const user = await changeUser(id, updateData);
  return toUserModel(user);
}

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateExistingUser,
};
