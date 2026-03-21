const { z } = require("zod");

const createInvoiceSchema = z.object({
  clientId: z.number(),
  projectId: z.number(),
  status: z
    .enum(["draft", "sent", "paid", "overdue"], {
      invalid_type_error: "Status must be one of: draft, sent, paid, overdue",
    })
    .optional(),
  issueDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
});

const updateInvoiceSchema = z.object({
  clientId: z.number().optional(),
  projectId: z.number().optional(),
  status: z
    .enum(["draft", "sent", "paid", "overdue"], {
      invalid_type_error: "Status must be one of: draft, sent, paid, overdue",
    })
    .optional(),
  issueDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
});

module.exports = {
  createInvoiceSchema,
  updateInvoiceSchema,
};
