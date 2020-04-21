const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  startDate: { type: Date, min: "2010-01-01", max: "2099-01-01" },
  endDate: { type: Date, min: "2010-01-01", max: "2099-01-01" },
  time: { type: String },
  repeatability: { type: String },
  category: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);
