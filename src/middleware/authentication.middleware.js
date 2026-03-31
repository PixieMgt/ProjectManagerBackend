const jwt = require("jsonwebtoken");

const { getProjectMemberRole } = require("../services/projects.service");
const { getClientOwner } = require("../services/clients.service");
const { getTaskProjectId } = require("../services/tasks.service");
const { getTimeEntryProjectId } = require("../services/time-entries.service");
const { getInvoiceProjectId } = require("../services/invoices.service");

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

function requireMinProjectRole(minRole) {
  return async (req, res, next) => {
    if (req.user.role === "admin") return next();

    const projectId = await resolveProjectId(req);
    if (!projectId)
      return res
        .status(400)
        .json({ message: "Failed to determine project ID" });

    const role = await getProjectMemberRole(projectId, req.user.userId);
    if (!role) return res.status(403).json({ message: "Not a project member" });

    const ROLE_LEVELS = {
      viewer: 1,
      tester: 2,
      developer: 3,
      owner: 4,
    };
    const memberAccessLevel = ROLE_LEVELS[role];
    const requiredAccessLevel = ROLE_LEVELS[minRole];

    if (memberAccessLevel < requiredAccessLevel)
      return res.status(403).json({ message: "Access denied" });

    next();
  };
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  next();
}

function requireSelf(req, res, next) {
  if (req.user.role === "admin") return next();
  if (req.params.userId === req.user.userId) return next();
  return res.status(403).json({ message: "Access denied" });
}

async function requireClientOwner(req, res, next) {
  if (req.user.role === "admin") return next();

  const clientId = await resolveClientId(req);
  if (!clientId)
    return res.status(400).json({ message: "Failed to determine client ID" });

  const clientOwner = await getClientOwner(clientId);
  const clientOwnerId = clientOwner.id;
  if (req.user.userId !== clientOwnerId)
    return res.status(403).json({ message: "Access denied" });

  next();
}

module.exports = {
  requireAuth,
  requireMinProjectRole,
  requireAdmin,
  requireSelf,
  requireClientOwner,
};

async function resolveProjectId(req) {
  const sources = [
    () => req.params.projectId,
    () => req.body?.projectId,
    async () =>
      req.params.taskId && (await getTaskProjectId(req.params.taskId)),
    async () => req.body?.taskId && (await getTaskProjectId(req.body.taskId)),
    async () =>
      req.params.timeEntryId &&
      (await getTimeEntryProjectId(req.params.timeEntryId)),
    async () =>
      req.params.invoiceId && (await getInvoiceProjectId(req.params.invoiceId)),
  ];

  for (const getId of sources) {
    const id = await getId();
    if (id) return id;
  }

  return null;
}

async function resolveClientId(req) {
  const sources = [() => req.params.clientId, () => req.body?.clientId];

  for (const getId of sources) {
    const id = await getId();
    if (id) return id;
  }

  return null;
}
