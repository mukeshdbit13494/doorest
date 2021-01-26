const fs = require("fs");
const dir = "./public/public/uploads/partners";

const path = require("path");
const multer = require("multer");

//partner upload images
exports.uploadPartner = function () {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync("./public/uploads", { recursive: true });
        fs.mkdirSync("./public/uploads/partners", { recursive: true });
        cb(null, "./public/uploads/partners");
      } else {
        cb(null, "./public/uploads/partners");
      }
    },
    filename: function (req, file, cb) {
      cb(null, req.body.partnerId + path.extname(file.originalname));
    },
  });
  return multer({ storage });
};

//user image upload
exports.uploadUser = function () {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync("./public/uploads", { recursive: true });
        fs.mkdirSync("./public/uploads/users", { recursive: true });
        cb(null, "./public/uploads/users");
      } else {
        cb(null, "./public/uploads/users");
      }
    },
    filename: function (req, file, cb) {
      cb(null, req.body.userId + path.extname(file.originalname));
    },
  });
  return multer({ storage });
};

//user image upload
exports.uploadServiceIcon = function () {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync("./public/uploads", { recursive: true });
        fs.mkdirSync("./public/uploads/service", { recursive: true });
        cb(null, "./public/uploads/service");
      } else {
        cb(null, "./public/uploads/service");
      }
    },
    filename: function (req, file, cb) {
      cb(null, req.body.serviceName + path.extname(file.originalname));
    },
  });
  return multer({ storage });
};
