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
  status: z
    .enum(["draft", "sent", "paid", "overdue"], {
      invalid_type_error: "Status must be one of: draft, sent, paid, overdue",
    })
    .optional(),
  issueDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
});

const createInvoiceItemSchema = z.object({
  description: z.string().min(1, "Description can't be empty").optional(),
  quantity: z.number(),
  unitPrice: z.number(),
});

const updateInvoiceItemSchema = z.object({
  description: z.string().min(1, "Description can't be empty").optional(),
  quantity: z.number().optional(),
  unitPrice: z.number().optional(),
});

module.exports = {
  createInvoiceSchema,
  updateInvoiceSchema,
  createInvoiceItemSchema,
  updateInvoiceItemSchema,
};
