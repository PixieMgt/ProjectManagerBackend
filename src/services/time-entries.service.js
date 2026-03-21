const {
  findAllTimeEntries,
  findTimeEntry,
  insertTimeEntry,
  changeTimeEntry,
  removeTimeEntry,
} = require("../repositories/time-entries.repository");
const { toTimeEntryModel } = require("../models/time-entry.model");

async function getAllTimeEntries() {
  const timeEntries = await findAllTimeEntries();
  return timeEntries.map(toTimeEntryModel);
}

async function getTimeEntryById(id) {
  const timeEntry = await findTimeEntry(id);
  if (!timeEntry) return null;
  return toTimeEntryModel(timeEntry);
}

async function createNewTimeEntry(data) {
  const normalized = {
    task_id: data.taskId,
    user_id: data.userId,
    comment: data.comment,
    start_time: data.startTime,
    end_time: data.endTime,
  };
  const timeEntry = await insertTimeEntry(normalized);
  return toTimeEntryModel(timeEntry);
}

async function updateExistingTimeEntry(id, data) {
  const normalized = {
    task_id: data.taskId,
    user_id: data.userId,
    comment: data.comment,
    start_time: data.startTime,
    end_time: data.endTime,
  };
  const timeEntry = await changeTimeEntry(id, normalized);
  if (!timeEntry) return null;
  return toTimeEntryModel(timeEntry);
}

async function deleteExistingTimeEntry(id) {
  const timeEntry = await removeTimeEntry(id);
  if (!timeEntry) return null;
  return toTimeEntryModel(timeEntry);
}

module.exports = {
  getAllTimeEntries,
  getTimeEntryById,
  createNewTimeEntry,
  updateExistingTimeEntry,
  deleteExistingTimeEntry,
};
