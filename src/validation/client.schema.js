const { z } = require("zod");

const createClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid e-mail").optional(),
  // E164 phone number standard
  phone: z.e164("Invalid phone number").optional(),
  notes: z.string().optional(),
});

const updateClientSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.email("Invalid e-mail").optional(),
  // E164 phone number standard
  phone: z.e164("Invalid phone number").optional(),
  notes: z.string().optional(),
});

module.exports = {
  createClientSchema,
  updateClientSchema,
};
