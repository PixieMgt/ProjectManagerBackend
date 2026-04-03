const { z } = require("zod");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

const createClientSchema = z
  .object({
    name: z
      .string("Name is required")
      .trim()
      .min(1, "Name can't be empty")
      .max(128, "Name is too long"),
    email: z
      .string("E-mail is required")
      .check(z.trim(), z.toLowerCase(), z.email("Invalid e-mail"))
      .optional(),
    phone: z
      .string()
      .trim()
      .refine((value) => {
        const phone = parsePhoneNumberFromString(value);
        return phone?.isValid();
      }, "Invalid phone number")
      .optional(),
    notes: z.string().trim().max(2000, "Notes are too long").optional(),
  })
  .strict();

const updateClientSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name can't be empty")
      .max(128, "Name is too long")
      .optional(),
    email: z
      .string()
      .check(z.trim(), z.toLowerCase(), z.email("Invalid e-mail"))
      .optional(),
    phone: z
      .string()
      .trim()
      .refine((value) => {
        const phone = parsePhoneNumberFromString(value);
        return phone?.isValid();
      }, "Invalid phone number")
      .optional(),
    notes: z.string().trim().max(2000, "Notes are too long").optional(),
  })
  .strict();

module.exports = {
  createClientSchema,
  updateClientSchema,
};
