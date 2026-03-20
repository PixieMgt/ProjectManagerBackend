const {
  findAllTimeEntries,
  findTimeEntry,
  insertTimeEntry,
  changeTimeEntry,
  removeTimeEntry,
} = require("../repositories/time-entries.repository");

async function getAllTimeEntries() {
  const timeEntries = await findAllTimeEntries();
  return timeEntries;
}

async function getTimeEntryById(id) {
  const timeEntry = await findTimeEntry(id);
  if (!timeEntry) return null;
  return timeEntry;
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
  return timeEntry;
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
  return timeEntry;
}

async function deleteExistingTimeEntry(id) {
  const timeEntry = await removeTimeEntry(id);
  if (!timeEntry) return null;
  return timeEntry;
}

module.exports = {
  getAllTimeEntries,
  getTimeEntryById,
  createNewTimeEntry,
  updateExistingTimeEntry,
  deleteExistingTimeEntry,
};
