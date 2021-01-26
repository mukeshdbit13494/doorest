const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelComplaint = Schema(
  {
    subject: { type: String, required: true },
    complainBody: { type: String, required: true },
    partnerId: { type: Schema.Types.ObjectId, ref: "Partner", default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    isDeleted: { type: Date, default: null },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", modelComplaint);
