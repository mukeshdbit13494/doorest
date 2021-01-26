const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelService = Schema(
  {
    serviceName: { type: String, required: true, unique: true },
    serviceIcon: { type: String, default: "default-service.png" },
    isDeleted: { type: Date, default: null },
  },
  {
    timestapms: true,
  }
);
module.exports = mongoose.model("Service", modelService);
