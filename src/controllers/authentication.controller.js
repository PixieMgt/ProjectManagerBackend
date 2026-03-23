const { getIronSession } = require("iron-session");
const jwt = require("jsonwebtoken");
const {
  registerNewUser,
  loginExistingUser,
} = require("../services/authentication.service");
const { getUserById } = require("../services/users.service");
const sessionOptions = require("../config/session.js");

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
    const user = await loginExistingUser(req.body);
    if (!user)
      return res.status(401).json({ message: "E-mail or password incorrect" });

    const session = await getIronSession(req, res, sessionOptions);
    session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    await session.save();

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
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
    const session = await getIronSession(req, res, sessionOptions);
    if (Object.keys(session).length === 0)
      return res.status(400).json({ message: "Not logged in" });
    session.destroy();
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getCurrentUser(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    if (Object.keys(session).length === 0)
      return res.status(400).json({ message: "Not logged in" });

    const token = jwt.sign(
      { userId: session.user.id, role: session.user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return res.status(200).json({ user: session.user, token });
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
