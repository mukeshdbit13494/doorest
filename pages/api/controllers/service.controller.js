const Service = require("../models/service");
const PartnerDetail = require("../models/partnerDetail");
const Mongoose = require("mongoose");
const partnerService = require("../models/partnerService");

// adding all services which listing on site
exports.addService = async function (req, res) {
  const { serviceName } = req.body;
  const serviceIcon = "/uploads/service/" + req.file.filename;

  try {
    await new Service({
      serviceName,
      serviceIcon,
    }).save((err, result) => {
      if (err) res.json({ status: false, message: "Something went wrong" });
      else {
        res.json({ status: true, message: "Service successfully saved" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//fetch all services with icons
exports.getAllServices = async function (req, res) {
  try {
    const result = await Service.find({}).sort({ serviceName: 1 });
    if (result) {
      res.json({ status: true, services: result });
    } else {
      res.json({ status: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

// top service list

exports.getTopServices = async function (req, res) {
  try {
    const data = await Service.aggregate([
      {
        $lookup: {
          from: "partnerservices",
          let: { serviceId: "$_id" },
          as: "partnerList",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$serviceId", "$$serviceId"] },
              },
            },
            {
              $lookup: {
                from: "leads",
                localField: "partnerId",
                foreignField: "partnerId",
                as: "leads",
              },
            },
          ],
        },
      },
    ]);
    if (data != null && data.length > 0) {
      return res.json({ status: true, data });
    } else {
      return res.json({ status: false, message: "Data not found", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
};
