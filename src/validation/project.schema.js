const { z } = require("zod");

const createProjectSchema = z.object({
  clientId: z.number().int().positive("Invalid client ID"),
  ownerUserId: z.number().int().positive("Invalid owner user ID"),
  name: z.string().min(1, "Name is required"),
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

module.exports = {
  createProjectSchema,
  updateProjectSchema,
};
