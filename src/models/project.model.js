function toProjectModel(row) {
  return {
    id: row.id,
    clientId: row.client_id,
    ownerUserId: row.owner_user_id,
    name: row.name,
    description: row.description,
    status: row.status,
    hourlyRate: row.hourly_rate,
    startDate: row.start_date,
    deadline: row.deadline,
  };
}

module.exports = {
  toProjectModel,
};
