async function register(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    res.status(200).json({ message: "under construction" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
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
