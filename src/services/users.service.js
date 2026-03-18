const { findAllUsers, findUser } = require("../repositories/users.repository");
const { toUserModel } = require("../models/user.model");

async function getAllUsers() {
  const users = await findAllUsers();
  return users.map(toUserModel);
}

async function getUserById(id) {
  const user = await findUser(id);
  return user.map(toUserModel);
}

module.exports = {
  getAllUsers,
  getUserById,
};
