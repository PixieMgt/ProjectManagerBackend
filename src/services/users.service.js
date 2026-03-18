const { findAllUsers } = require("../repositories/users.repository");
const { toUserModel } = require("../models/user.model");

async function getAllUsers() {
  const users = await findAllUsers();
  return users.map(toUserModel);
}

module.exports = {
  getAllUsers,
};
