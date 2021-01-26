const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelStateAndCity = Schema(
  {
    state: { type: String, required: true, lowercase: true },
    city: { type: String, required: true, lowercase: true, unique: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StateAndCity", modelStateAndCity);
