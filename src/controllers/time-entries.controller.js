const {
  getAllTimeEntries,
  getTimeEntryById,
  createNewTimeEntry,
  updateExistingTimeEntry,
  deleteExistingTimeEntry,
} = require("../services/time-entries.service");

async function getTimeEntries(req, res) {
  try {
    const timeEntries = await getAllTimeEntries();
    return res.status(200).json({ time_entries: timeEntries });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getTimeEntry(req, res) {
  try {
    const timeEntry = await getTimeEntryById(req.params.timeEntryId);
    if (!timeEntry)
      return res.status(404).json({
        message: `Time entry with id $${req.params.timeEntryId} not found`,
      });
    return res.status(200).json({ time_entry: timeEntry });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createTimeEntry(req, res) {
  try {
    const timeEntry = await createNewTimeEntry(req.user.userId, req.body);
    return res.status(200).json({ time_entry: timeEntry });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateTimeEntry(req, res) {
  try {
    const timeEntry = await updateExistingTimeEntry(
      req.params.timeEntryId,
      req.body,
    );
    if (!timeEntry)
      return res.status(404).json({
        message: `Time entry with id $${req.params.timeEntryId} not found`,
      });
    return res.status(200).json({ time_entry: timeEntry });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteTimeEntry(req, res) {
  try {
    const timeEntry = await deleteExistingTimeEntry(req.params.timeEntryId);
    if (!timeEntry)
      return res.status(404).json({
        message: `Time entry with id ${req.params.timeEntryId} not found`,
      });
    return res.status(200).json({ time_entry: timeEntry });
  } catch (e) {
    console.error(e);

    if (e.message === "DATABASE_ERROR")
      return res.status(500).json({ message: "Database error" });
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getTimeEntries,
  getTimeEntry,
  createTimeEntry,
  updateTimeEntry,
  deleteTimeEntry,
};
