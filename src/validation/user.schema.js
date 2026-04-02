const { z } = require("zod");

const createUserSchema = z.object({
  name: z
    .string("Name is required")
    .min(1, "Name can't be empty")
    .max(128, "Name is too long"),
  email: z
    .string("E-mail is required")
    .check(z.trim(), z.toLowerCase(), z.email("Invalid e-mail")),
  password: z
    .string("Password is required")
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  role: z.enum(["admin", "developer"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be one of: admin, developer",
  }),
});

const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name can't be empty")
    .max(128, "Name is too long")
    .optional(),
  email: z
    .string("E-mail is required")
    .check(z.trim(), z.toLowerCase(), z.email("Invalid e-mail")),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    )
    .optional(),
  role: z
    .enum(["admin", "developer"], {
      invalid_type_error: "Role must be one of: admin, developer",
    })
    .optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
