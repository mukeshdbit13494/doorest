const mongoose = require("mongoose");
const { regName, regEmail } = require("../validation/regex");
const Schema = mongoose.Schema;

const modelPartner = Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required!"],
      lowercase: true,
      validate: {
        validator: function (v) {
          return regName.test(v);
        },
        message: "Firstname is not valid!",
      },
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required!"],
      lowercase: true,
      validate: {
        validator: function (v) {
          return regName.test(v);
        },
        message: "Lastname is not valid!",
      },
    },
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    mobile: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return regEmail.test(v);
        },
        message: "Email is not valid!",
      },
    },
    isDeleted: { type: Date, default: null },
  },
  {
    timestapms: true,
  }
);
module.exports = mongoose.model("Partner", modelPartner);
