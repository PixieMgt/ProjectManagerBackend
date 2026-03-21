const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  insertUser,
  authenticateUser,
} = require("../repositories/users.repository");
const { toUserModel } = require("../models/user.model");

async function registerNewUser(data) {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const normalized = {
    name: data.name,
    email: data.email,
    password_hash: passwordHash,
    role: "developer",
  };
  const user = await insertUser(normalized);
  return toUserModel(user);
}

async function loginExistingUser(data) {
  const user = await authenticateUser(data.email);
  if (!user) return null;

  const authenticated = await bcrypt.compare(data.password, user.password_hash);
  if (!authenticated) return null;

  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
}

module.exports = {
  registerNewUser,
  loginExistingUser,
};
