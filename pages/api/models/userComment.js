const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const modelUserComment = Schema(
  {
    partnerId: { type: Schema.Types.ObjectId, ref: "Partner", default: null },
    isDeleted: { type: Date, default: null },
    comments: [
      new Schema({
        _id: false,
        rating: { type: Schema.Types.Mixed, required: true },
        comment: { type: String, required: true, max: 350, lowercase: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now() },
      }),
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("UserComment", modelUserComment);
