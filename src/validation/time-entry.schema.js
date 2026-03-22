const { z } = require("zod");

const createTimeEntrySchema = z.object({
  taskId: z.number(),
  comment: z.string().min(1, "Comment can't be empty").optional(),
  startTime: z.iso.datetime().optional(),
  endTime: z.iso.datetime().optional(),
});

const updateTimeEntrySchema = z.object({
  comment: z.string().min(1, "Comment can't be empty").optional(),
  startTime: z.iso.datetime().optional(),
  endTime: z.iso.datetime().optional(),
});

module.exports = {
  createTimeEntrySchema,
  updateTimeEntrySchema,
};
