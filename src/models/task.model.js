function toTaskModel(row) {
  return {
    id: row.id,
    projectId: row.projectId,
    ownerUserId: row.ownerUserId,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    estimatedHours: row.estimatedHours,
  };
}

module.exports = {
  toTaskModel,
};
