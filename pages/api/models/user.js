const mongoose = require("mongoose");
const { regEmail, regName } = require("../validation/regex");
const Schema = mongoose.Schema;

const modelUser = Schema(
  {
    firstName: {
      type: String,
      default: null,
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
      default: null,
      lowercase: true,
      validate: {
        validator: function (v) {
          return regName.test(v);
        },
        message: "Lastname is not valid!",
      },
    },
    username: { type: String, unique: true, lowercase: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      validate: {
        validator: function (v) {
          return regEmail.test(v);
        },
        message: "Email is not valid!",
      },
      unique: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required"],
      unique: true,
    },
    dob: { type: String },
    password: { type: String, required: [true, "Password is required"] },
    alternateMobile: { type: String, default: null },
    image: { type: String, default: "/default-image.jpg" },
    address: {
      streetNumber: { type: String, default: null },
      street: { type: String, default: null, lowercase: true },
      pincode: { type: Number, default: 0 },
      city: { type: String, default: null, lowercase: true },
      state: { type: String, default: null, lowercase: true },
      landMark: { type: String, default: null, lowercase: true },
    },
    isDeleted: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", modelUser);
