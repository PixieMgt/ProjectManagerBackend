const {
  registerNewUser,
  loginExistingUser,
} = require("../services/authentication.service");

async function register(req, res) {
  try {
    const user = await registerNewUser(req.body);
    return res.status(201).json({ user });
  } catch (e) {
    console.error(e);

    if (e.message === "EMAIL_IN_USE")
      return res.status(400).json({ message: "E-mail already in use" });
    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const token = await loginExistingUser(req.body);
    if (!token)
      return res.status(401).json({ message: "E-mail or password incorrect" });
    return res.status(200).json({ token });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function logout(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getCurrentUser(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function refresh(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  refresh,
};
