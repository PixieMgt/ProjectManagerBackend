require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

const authenticationRouter = require("./routes/authentication.routes.js");
const usersRouter = require("./routes/users.routes.js");
const clientsRouter = require("./routes/clients.routes.js");
const projectsRouter = require("./routes/projects.routes.js");
const tasksRouter = require("./routes/tasks.routes.js");
const timeEntriesRouter = require("./routes/time-entries.routes.js");
const repositoriesRouter = require("./routes/repositories.routes.js");
const commitsRouter = require("./routes/commits.routes.js");
const pullRequestsRouter = require("./routes/pull-requests.routes.js");
const deploymentsRouter = require("./routes/deployments.routes.js");
const invoicesRouter = require("./routes/invoices.routes.js");
const documentsRouter = require("./routes/documents.routes.js");
const activitiesRouter = require("./routes/activities.routes.js");
const integrationsRouter = require("./routes/integrations.routes.js");

app.use("/api/auth", authenticationRouter);
app.use("/api/users", usersRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/time-entries", timeEntriesRouter);
app.use("/api/repositories", repositoriesRouter);
app.use("/api/commits", commitsRouter);
app.use("/api/pull-requests", pullRequestsRouter);
app.use("/api/deployments", deploymentsRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/documents", documentsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/integrations", integrationsRouter);

app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is running and app is listening on port " + PORT);
  else console.log("Error occured, server can't be started", error);
});
