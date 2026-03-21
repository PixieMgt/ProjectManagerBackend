function toTimeEntryModel(row) {
  return {
    id: row.id,
    taskId: row.task_id,
    userId: row.user_id,
    comment: row.comment,
    startTime: row.start_time,
    endTime: row.end_time,
    durationMinutes: row.duration_minutes,
  };
}

module.exports = {
  toTimeEntryModel,
};
