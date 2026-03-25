const { z } = require("zod");

const createTimeEntrySchema = z.object({
  taskId: z.number(),
  comment: z.string().min(1, "Comment can't be empty").optional(),
  date: z.iso.date().optional(),
  startTime: z.iso.time().optional(),
  endTime: z.iso.time().optional(),
});

const updateTimeEntrySchema = z.object({
  comment: z.string().min(1, "Comment can't be empty").optional(),
  date: z.iso.date().optional(),
  startTime: z.iso.time().optional(),
  endTime: z.iso.time().optional(),
});

module.exports = {
  createTimeEntrySchema,
  updateTimeEntrySchema,
};
