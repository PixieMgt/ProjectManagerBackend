function toTaskModel(row) {
  return {
    id: row.task_id,
    project: row.project_id
      ? {
          id: row.project_id,
          name: row.project_name,
          description: row.project_description,
          status: row.project_status,
          hourly_rate: row.project_hourly_rate,
          start_date: row.project_start_date,
          deadline: row.project_deadline,
        }
      : undefined,
    owner: row.owner_user_id
      ? {
          id: row.owner_user_id,
          name: row.owner_user_name,
        }
      : undefined,
    title: row.task_title,
    description: row.task_description,
    status: row.task_status,
    priority: row.task_priority,
    estimatedHours: row.task_estimated_hours,
  };
}

module.exports = {
  toTaskModel,
};
