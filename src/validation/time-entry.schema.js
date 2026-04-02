const { z } = require("zod");

const createTimeEntrySchema = z.object({
  taskId: z.number("Task ID is required").positive("Invalid task ID"),
  comment: z
    .string()
    .trim()
    .min(1, "Comment can't be empty")
    .max(500, "Comment is too long")
    .optional(),
  date: z.coerce.date("Invalid date").optional(),
  startTime: z.iso.time("Invalid time").optional(),
  endTime: z.iso.time("Invalid time").optional(),
});

const updateTimeEntrySchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, "Comment can't be empty")
    .max(500, "Comment is too long")
    .optional(),
  date: z.coerce.date("Invalid date").optional(),
  startTime: z.iso.time("Invalid time").optional(),
  endTime: z.iso.time("Invalid time").optional(),
});

module.exports = {
  createTimeEntrySchema,
  updateTimeEntrySchema,
};
