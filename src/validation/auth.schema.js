const { z } = require("zod");

const registerSchema = z
  .object({
    name: z
      .string("Name is required")
      .trim()
      .min(1, "Name can't be empty")
      .max(128, "Name is too long"),
    email: z
      .string("E-mail is required")
      .check(z.trim(), z.toLowerCase(), z.email("Invalid e-mail")),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password is too long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
  })
  .strict();

const loginSchema = z
  .object({
    email: z
      .string("E-mail is required")
      .check(z.trim(), z.toLowerCase(), z.email("Invalid e-mail")),
    password: z
      .string("Password is required")
      .trim()
      .min(1, "Password can't be empty"),
  })
  .strict();

module.exports = {
  registerSchema,
  loginSchema,
};
