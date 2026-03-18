const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid e-mail"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  role: z.enum(["admin", "developer", "client"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be one of: admin, employee, client",
  }),
});

module.exports = {
  createUserSchema,
};
