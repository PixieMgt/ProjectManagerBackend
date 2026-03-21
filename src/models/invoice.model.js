function toInvoiceModel(row) {
  return {
    id: row.id,
    clientId: row.client_id,
    projectId: row.project_id,
    status: row.status,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    totalAmount: row.total_amount,
  };
}

module.exports = {
  toInvoiceModel,
};
