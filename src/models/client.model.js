function toClientModel(row) {
  return {
    id: row.client_id,
    owner: row.owner_user_id
      ? {
          id: row.owner_user_id,
          name: row.owner_user_name,
        }
      : undefined,
    name: row.client_name,
    email: row.client_email,
    phone: row.client_phone,
    notes: row.client_notes,
  };
}

module.exports = {
  toClientModel,
};
