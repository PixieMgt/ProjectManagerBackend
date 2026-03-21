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

function toInvoiceItemModel(row) {
  return {
    id: row.id,
    invoiceId: row.invoice_id,
    description: row.description,
    quantity: row.quantity,
    unitPrice: row.unit_price,
    total: row.total,
  };
}

module.exports = {
  toInvoiceModel,
  toInvoiceItemModel,
};
