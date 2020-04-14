const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: { type: String, require: true },
  color: { type: String, require: true },
  checked: { type: Boolean, require: false },
  isHidden: { type: Boolean, require: false },
});

module.exports = mongoose.model("Category", categorySchema);
