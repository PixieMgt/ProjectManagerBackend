function toUserModel(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
  };
}

function toUserSearchModel(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
  };
}

module.exports = {
  toUserModel,
  toUserSearchModel,
};
