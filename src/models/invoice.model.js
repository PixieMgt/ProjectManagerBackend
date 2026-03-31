function toInvoiceModel(row) {
  return {
    id: row.invoice_id,
    client: row.client_id
      ? {
          id: row.client_id,
          name: row.client_name,
          email: row.client_email,
          phone: row.client_phone,
          notes: row.client_notes,
        }
      : undefined,
    project: row.project_id
      ? {
          id: row.project_id,
          name: row.project_name,
          description: row.project_description,
          status: row.project_status,
          hourly_rate: row.project_hourly_rate,
          start_date: row.project_start_date,
          deadline: row.project_deadline,
        }
      : undefined,
    status: row.invoice_status,
    issueDate: row.invoice_issue_date,
    dueDate: row.invoice_due_date,
    totalAmount: row.invoice_total_amount,
  };
}

function toInvoiceItemModel(row) {
  return {
    id: row.invoice_item_id,
    description: row.invoice_item_description,
    quantity: row.invoice_item_quantity,
    unitPrice: row.invoice_item_unit_price,
    total: row.invoice_item_total,
  };
}

module.exports = {
  toInvoiceModel,
  toInvoiceItemModel,
};
