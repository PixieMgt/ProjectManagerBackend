function toClientModel(row) {
  return {
    id: row.id,
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
