function toProjectModel(row) {
  return {
    id: row.project_id,
    client: row.client_id
      ? {
          id: row.client_id,
          name: row.client_name,
          email: row.client_email,
          phone: row.client_phone,
          notes: row.client_notes,
        }
      : undefined,
    owner: row.owner_user_id
      ? {
          id: row.owner_user_id,
          name: row.owner_user_name,
        }
      : undefined,
    name: row.project_name,
    description: row.project_description,
    status: row.project_status,
    hourlyRate: row.project_hourly_rate,
    startDate: row.project_start_date,
    deadline: row.project_deadline,
  };
}

function toProjectMemberModel(row) {
  return {
    id: row.user_id,
    name: row.user_name,
    role: row.project_member_role,
  };
}

module.exports = {
  toProjectModel,
  toProjectMemberModel,
};
