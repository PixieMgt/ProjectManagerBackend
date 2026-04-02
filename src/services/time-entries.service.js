const {
  findAllTimeEntries,
  findTimeEntry,
  insertTimeEntry,
  changeTimeEntry,
  removeTimeEntry,
} = require("../repositories/time-entries.repository");
const { toTimeEntryModel } = require("../models/time-entry.model");
const { getTaskProjectId } = require("./tasks.service");

async function getAllTimeEntries() {
  const timeEntries = await findAllTimeEntries();
  return timeEntries.map(toTimeEntryModel);
}

async function getTimeEntryById(id) {
  const timeEntry = await findTimeEntry(id);
  if (!timeEntry) return null;
  return toTimeEntryModel(timeEntry);
}

async function getTimeEntryProjectId(id) {
  const timeEntry = await getTimeEntryById(id);
  if (!timeEntry) return null;
  return await getTaskProjectId(timeEntry.task.id);
}

async function createNewTimeEntry(userId, data) {
  const normalized = {
    task_id: data.taskId,
    user_id: userId,
    comment: data.comment,
    date: data.date,
    start_time: data.startTime,
    end_time: data.endTime,
  };
  const timeEntry = await insertTimeEntry(normalized);
  return toTimeEntryModel(timeEntry);
}

async function updateExistingTimeEntry(id, data) {
  const normalized = {
    comment: data.comment,
    date: data.date,
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
  getTimeEntryProjectId,
  createNewTimeEntry,
  updateExistingTimeEntry,
  deleteExistingTimeEntry,
};
