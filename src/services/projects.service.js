const { findAllProjects } = require("../repositories/projects.repository");
const { toProjectModel } = require("../models/project.model");

async function getAllProjects() {
  const projects = await findAllProjects();
  return projects.map(toProjectModel);
}

module.exports = {
  getAllProjects,
};
