const jwt = require("jsonwebtoken");

const { getProjectMemberRole } = require("../services/projects.service");

function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Missing auth token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Invalid auth token" });
  }
}

function requireGlobalRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Access denied" });
    next();
  };
}

function requireProjectRole(role) {
  return async (req, res, next) => {
    const member = await getProjectMemberRole(
      req.params.projectId,
      req.user.userId,
    );
    if (!member)
      return res.status(403).json({ message: "Not a project member" });
    if (member.role !== role)
      return res.status(403).json({ message: "Access denied" });
    next();
  };
}

function requireSelfOrAdmin(req, res, next) {
  if (req.user.role === "admin") return next();
  if (Number(req.params.id) === req.user.userId) return next();
  return res.status(403).json({ message: "Access denied" });
}

module.exports = {
  requireAuth,
  requireGlobalRole,
  requireProjectRole,
  requireSelfOrAdmin,
};
