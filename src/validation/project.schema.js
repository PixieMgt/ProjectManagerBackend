const { z, date } = require("zod");

const createProjectSchema = z.object({
  clientId: z.number("Client ID is required").positive("Invalid client ID"),
  name: z
    .string("Name is required")
    .trim()
    .min(1, "Name can't be empty")
    .max(128, "Name is too long"),
  description: z
    .string()
    .trim()
    .min(1, "Description can't be empty")
    .max(500, "Description is too long")
    .optional(),
  status: z
    .enum(["planning", "active", "completed", "archived"], {
      invalid_type_error:
        "Status must be one of: planning, active, completed, archived",
    })
    .optional(),
  hourlyRate: z
    .number()
    .positive("Hourly rate can't be negative")
    .max(10000, "Hourly rate is too high")
    .optional(),
  startDate: z.coerce.date("Invalid date").optional(),
  deadline: z.coerce.date("Invalid date").optional(),
});

const updateProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name can't be empty")
    .max(128, "Name is too long")
    .optional(),
  description: z
    .string()
    .trim()
    .min(1, "Description can't be empty")
    .max(500, "Description is too long")
    .optional(),
  status: z
    .enum(["planning", "active", "completed", "archived"], {
      invalid_type_error:
        "Status must be one of: planning, active, completed, archived",
    })
    .optional(),
  hourlyRate: z
    .number()
    .positive("Hourly rate can't be negative")
    .max(10000, "Hourly rate is too high")
    .optional(),
  startDate: z.coerce.date("Invalid date").optional(),
  deadline: z.coerce.date("Invalid date").optional(),
});

const createProjectMemberSchema = z.object({
  userId: z.number("User ID is required").positive("Invalid User ID"),
  role: z.enum(["owner", "developer", "tester", "viewer"], {
    require_error: "Role is required",
    invalid_type_error: "Role must be one of: owner, developer, tester, viewer",
  }),
});

const updateProjectMemberSchema = z.object({
  role: z
    .enum(["owner", "developer", "tester", "viewer"], {
      require_error: "Role is required",
      invalid_type_error:
        "Role must be one of: owner, developer, tester, viewer",
    })
    .optional(),
});

module.exports = {
  createProjectSchema,
  updateProjectSchema,
  createProjectMemberSchema,
  updateProjectMemberSchema,
};
