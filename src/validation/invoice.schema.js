const { z } = require("zod");

const createInvoiceSchema = z
  .object({
    clientId: z.number("Client ID is required").positive("Invalid client ID"),
    projectId: z
      .number("Project ID is required")
      .positive("Invalid project ID"),
    status: z
      .enum(["draft", "sent", "paid", "overdue"], {
        invalid_type_error: "Status must be one of: draft, sent, paid, overdue",
      })
      .optional(),
    issueDate: z.coerce.date("Invalid date").optional(),
    dueDate: z.coerce.date("Invalid date").optional(),
  })
  .strict();

const updateInvoiceSchema = z
  .object({
    status: z
      .enum(["draft", "sent", "paid", "overdue"], {
        invalid_type_error: "Status must be one of: draft, sent, paid, overdue",
      })
      .optional(),
    issueDate: z.coerce.date("Invalid date").optional(),
    dueDate: z.coerce.date("Invalid date").optional(),
  })
  .strict();

const createInvoiceItemSchema = z
  .object({
    description: z
      .string()
      .trim()
      .min(1, "Description can't be empty")
      .max(500, "Description is too long"),
    quantity: z
      .number("Quantity is required")
      .positive("Quantity can't be negative")
      .max(10000, "Quantity is too high"),
    unitPrice: z
      .number("Unit price is required")
      .positive("Unit price can't be negative")
      .max(1000000, "Unit price is too high"),
  })
  .strict();

const updateInvoiceItemSchema = z
  .object({
    description: z
      .string()
      .trim()
      .min(1, "Description can't be empty")
      .max(500, "Description is too long")
      .optional(),
    quantity: z
      .number()
      .positive("Quantity can't be negative")
      .max(10000, "Quantity is too high")
      .optional(),
    unitPrice: z
      .number()
      .positive("Unit price can't be negative")
      .max(1000000, "Unit price is too high")
      .optional(),
  })
  .strict();

module.exports = {
  createInvoiceSchema,
  updateInvoiceSchema,
  createInvoiceItemSchema,
  updateInvoiceItemSchema,
};
