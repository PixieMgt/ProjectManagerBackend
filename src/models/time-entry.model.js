function toTimeEntryModel(row) {
  return {
    id: row.time_entry_id,
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
    task: row.task_id
      ? {
          id: row.task_id,
          title: row.task_title,
          description: row.task_description,
          status: row.task_status,
          priority: row.task_priority,
          estimated_hours: row.task_estimated_hours,
        }
      : undefined,
    user: row.user_id
      ? {
          id: row.user_id,
          name: row.user_name,
        }
      : undefined,
    comment: row.time_entry_comment,
    date: row.time_entry_date,
    startTime: row.time_entry_start_time,
    endTime: row.time_entry_end_time,
    durationMinutes: row.time_entry_duration_minutes,
  };
}

module.exports = {
  toTimeEntryModel,
};
