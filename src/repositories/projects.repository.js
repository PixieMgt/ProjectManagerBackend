const db = require("../config/db");

async function findAllProjects() {
  try {
    return await db("projects").select("*");
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findProject(id) {
  try {
    const [row] = await db("projects").where({ id }).select("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function insertProject(data) {
  try {
    const [row] = await db("projects").insert(data).returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function changeProject(id, data) {
  try {
    const [row] = await db("projects")
      .where({ id })
      .update(data)
      .returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function removeProject(id) {
  try {
    const [row] = await db("projects").where({ id }).delete().returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllProjectMembers(id) {
  try {
    const members = await db("project_members")
      .where({ project_id: id })
      .select("*");
    return members;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function insertProjectMember(data) {
  try {
    const [row] = await db("project_members").insert(data).returning("*");
    return row;
  } catch (e) {
    // Duplicate key combination error codes for MSSQL
    if (e.number === 2627 || e.number === 2601) {
      throw new Error("PROJECT_MEMBER_ALREADY_EXISTS");
    }

    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function changeProjectMember(projectId, userId, data) {
  try {
    const [row] = await db("project_members")
      .where({ project_id: projectId })
      .where({ user_id: userId })
      .update(data)
      .returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function removeProjectMember(projectId, userId) {
  try {
    const [row] = await db("project_members")
      .where({ project_id: projectId })
      .where({ user_id: userId })
      .delete()
      .returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllUserProjects(id) {
  try {
    const projects = await db("projects")
      .where({ owner_user_id: id })
      .select("*");
    return projects;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllClientProjects(id) {
  try {
    const projects = await db("projects").where({ client_id: id }).select("*");
    return projects;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

module.exports = {
  findAllProjects,
  findProject,
  insertProject,
  changeProject,
  removeProject,
  findAllProjectMembers,
  insertProjectMember,
  changeProjectMember,
  removeProjectMember,
  findAllUserProjects,
  findAllClientProjects,
};
