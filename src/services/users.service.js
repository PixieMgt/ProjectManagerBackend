const bcrypt = require("bcrypt");

const {
  findAllUsers,
  findUser,
  insertUser,
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

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
};
