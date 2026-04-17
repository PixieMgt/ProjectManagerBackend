const { z } = require("zod");

const createTaskSchema = z.object({
  ownerUserId: z
    .number("Owner user ID is required")
    .positive("Invalid user ID"),
  projectId: z.number("Project ID is required").positive("Invalid project ID"),
  title: z
    .string("Title is required")
    .trim()
    .min(1, "Title can't be empty")
    .max(128, "Title is too long"),
  description: z
    .string()
    .trim()
    .min(1, "Description can't be empty")
    .max(500, "Description is too long")
    .optional(),
  status: z
    .enum(["todo", "in_progress", "review", "done"], {
      invalid_type_error:
        "Status must be one of: todo, in_progress, review, done",
    })
    .optional(),
  priority: z
    .enum(["low", "medium", "high", "critical"], {
      invalid_type_error:
        "Priority must be one of: low, medium, high, critical",
    })
    .optional(),
  estimatedHours: z
    .number()
    .nonnegative("Estimated hours can't be negative")
    .max(10000, "Estimated hours is too high")
    .optional(),
});

const updateTaskSchema = z.object({
  ownerUserId: z.number().positive("Invalid user ID").optional(),
  title: z
    .string()
    .trim()
    .min(1, "Title can't be empty")
    .max(128, "Title is too long")
    .optional(),
  description: z
    .string()
    .trim()
    .min(1, "Description can't be empty")
    .max(500, "Description is too long")
    .optional(),
  status: z
    .enum(["todo", "in_progress", "review", "done"], {
      invalid_type_error:
        "Status must be one of: todo, in_progress, review, done",
    })
    .optional(),
  priority: z
    .enum(["low", "medium", "high", "critical"], {
      invalid_type_error:
        "Priority must be one of: low, medium, high, critical",
    })
    .optional(),
  estimatedHours: z
    .number()
    .nonnegative("Estimated hours can't be negative")
    .max(10000, "Estimated hours is too high")
    .optional(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
