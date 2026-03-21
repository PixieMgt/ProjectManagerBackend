const { z, date } = require("zod");

const createProjectSchema = z.object({
  clientId: z.number().int().positive("Invalid client ID"),
  ownerUserId: z.number().int().positive("Invalid owner user ID"),
  name: z.string("Name is required").min(1, "Name can't be empty"),
  description: z.string().optional(),
  status: z
    .enum(["planning", "active", "completed", "archived"], {
      invalid_type_error:
        "Status must be one of: planning, active, completed, archived",
    })
    .optional(),
  hourlyRate: z.number().optional(),
  startDate: z.coerce.date().optional(),
  deadline: z.coerce.date().optional(),
});

const updateProjectSchema = z.object({
  clientId: z.number().int().positive("Invalid client ID").optional(),
  ownerUserId: z.number().int().positive("Invalid owner user ID").optional(),
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  status: z
    .enum(["planning", "active", "completed", "archived"], {
      invalid_type_error:
        "Status must be one of: planning, active, completed, archived",
    })
    .optional(),
  hourlyRate: z.number().optional(),
  startDate: z.coerce.date().optional(),
  deadline: z.coerce.date().optional(),
});

const createProjectMemberSchema = z.object({
  userId: z.number(),
  role: z.enum(["owner", "developer", "tester", "viewer"], {
    require_error: "Role is required",
    invalid_type_error: "Role must be one of: owner, developer, tester, viewer",
  }),
});

const updateProjectMemberSchema = z.object({
  userId: z.number().optional(),
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
