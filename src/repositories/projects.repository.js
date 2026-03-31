const db = require("../config/db");

async function findAllProjects() {
  try {
    return await db("projects as p")
      .join("clients as c", "p.client_id", "c.id")
      .join("users as u", "p.owner_user_id", "u.id")
      .select(
        "p.id as project_id",
        "p.name as project_name",
        "p.description as project_description",
        "p.status as project_status",
        "p.hourly_rate as project_hourly_rate",
        "p.start_date as project_start_date",
        "p.deadline as project_deadline",
        "u.id as owner_user_id",
        "u.name as owner_user_name",
        "c.id as client_id",
        "c.name as client_name",
        "c.email as client_email",
        "c.phone as client_phone",
        "c.notes as client_notes",
      );
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findProject(id) {
  try {
    const [row] = await db("projects as p")
      .where({ "p.id": id })
      .join("clients as c", "p.client_id", "c.id")
      .join("users as u", "p.owner_user_id", "u.id")
      .select(
        "p.id as project_id",
        "p.name as project_name",
        "p.description as project_description",
        "p.status as project_status",
        "p.hourly_rate as project_hourly_rate",
        "p.start_date as project_start_date",
        "p.deadline as project_deadline",
        "u.id as owner_user_id",
        "u.name as owner_user_name",
        "c.id as client_id",
        "c.name as client_name",
        "c.email as client_email",
        "c.phone as client_phone",
        "c.notes as client_notes",
      );
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
    const [row] = await db("projects")
      .where({ id })
      .update({ deleted_at: new Date() })
      .returning("*");
    return row;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllProjectMembers(id) {
  try {
    const members = await db("project_members as pm")
      .where({ "pm.project_id": id })
      .leftJoin("users as u", "pm.user_id", "u.id")
      .select(
        "u.id as user_id",
        "u.name as user_name",
        "pm.role as project_member_role",
      );
    return members;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findProjectMemberRole(projectId, userId) {
  try {
    const [row] = await db("project_members")
      .where({ project_id: projectId, user_id: userId })
      .select("role");
    return row;
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
    const projects = await db("projects as p")
      .where({ "p.owner_user_id": id })
      .whereNull("p.deleted_at")
      .leftJoin("clients as c", "p.client_id", "c.id")
      .select(
        "p.id as project_id",
        "p.name as project_name",
        "p.description as project_description",
        "p.status as project_status",
        "p.hourly_rate as project_hourly_rate",
        "p.start_date as project_start_date",
        "p.deadline as project_deadline",
        "c.id as client_id",
        "c.name as client_name",
        "c.email as client_email",
        "c.phone as client_phone",
        "c.notes as client_notes",
      );
    return projects;
  } catch (e) {
    console.error(e);
    throw new Error("DATABASE_ERROR");
  }
}

async function findAllClientProjects(id) {
  try {
    const projects = await db("projects")
      .where({ client_id: id })
      .select(
        "id as project_id",
        "name as project_name",
        "description as project_description",
        "status as project_status",
        "hourly_rate as project_hourly_rate",
        "start_date as project_start_date",
        "deadline as project_deadline",
      );
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
  findProjectMemberRole,
  insertProjectMember,
  changeProjectMember,
  removeProjectMember,
  findAllUserProjects,
  findAllClientProjects,
};
