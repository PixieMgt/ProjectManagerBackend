function toTimeEntryModel(row) {
  return {
    id: row.id,
    taskId: row.taskId,
    userId: row.userId,
    comment: row.comment,
    startTime: row.startTime,
    endTime: row.endTime,
    durationMinutes: row.durationMinutes,
  };
}

module.exports = {
  toTimeEntryModel,
};
