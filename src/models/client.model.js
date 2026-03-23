function toClientModel(row) {
  return {
    id: row.id,
    ownerUserId: row.owner_user_id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    notes: row.notes,
  };
}

module.exports = {
  toClientModel,
};
