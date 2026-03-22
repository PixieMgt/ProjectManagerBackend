const { z } = require("zod");

const createTaskSchema = z.object({
  projectId: z.number(),
  title: z.string("Title is required").min(1, "Title can't be empty"),
  description: z.string().optional(),
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
  estimatedHours: z.number().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1, "Title can't be empty").optional(),
  description: z.string().optional(),
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
  estimatedHours: z.number().optional(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
