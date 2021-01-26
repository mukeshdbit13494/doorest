const Partner = require("../models/partner");
const bcrypt = require("bcrypt");
const PartnerDetail = require("../models/partnerDetail");
const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");

//partner registration
exports.partnerRegister = async function (req, res) {
  const { mobile, username, password, firstName, lastName, email } = req.body;
  try {
    // this class is used for encrypting passwords with some our keywords or salt for example i am passing 10
    const salt = bcrypt.genSalt(parseInt(process.env.SALT_KEY), (err, salt) => {
      if (err) res.json({ status: false, message: "Error " + err });
      else if (salt == null)
        res.json({ status: false, message: "Something is missing " });
      else {
        // password encrypting start
        bcrypt.hash(password, salt, async (err2, hash) => {
          if (err2) res.json({ status: false, message: err2 });
          await new Partner({
            mobile,
            username,
            password: hash,
            firstName,
            lastName,
            email,
          }).save((err3, response) => {
            if (err3) {
              console.log(err3);
              res.json({ status: false, message: "Something is wrong" });
            } else if (response == null) {
              console.log(err3);
              res.json({ status: false, message: "Something is wrong" });
            } else {
              const token = jwt.sign(
                { username: response.username, id: response._id },
                process.env.JWT_KEY,
                {
                  expiresIn: "7d",
                }
              );
              res.json({
                status: true,
                message: "Partner successfully registered",
                token,
              });
            }
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//get partner login info
exports.partnerLogin = async function (req, res) {
  const { username, password } = req.body;

  try {
    await Partner.findOne(
      {
        $and: [
          {
            $or: [
              { username: username },
              { mobile: username },
              { email: username },
            ],
          },
          { isDeleted: null },
        ],
      },
      (err, result) => {
        if (err)
          return res.json({
            status: false,
            message: "Credential doesn't exist",
          });
        if (result != null) {
          bcrypt.compare(password, result.password, (err2, result2) => {
            if (err2)
              return res.json({
                status: false,
                message: err2.message,
              });
            if (result2) {
              const token = jwt.sign(
                { username: result.username, id: result._id },
                process.env.JWT_KEY,
                {
                  expiresIn: "7d",
                }
              );
              return res.json({
                status: true,
                message: "Login successfull",
                token,
              });
            } else {
              return res.json({
                status: false,
                message: "Password doesn't match",
              });
            }
          });
        } else {
          return res.json({
            status: false,
            message: "Username doesn't exist!",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
//get partner
exports.getPartner = async function (req, res) {
  try {
    const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);
    const partner = await Partner.aggregate([
      {
        $match: { _id: Mongoose.Types.ObjectId(id), isDeleted: null },
      },
      {
        $lookup: {
          from: "partnerdetails",
          localField: "_id",
          foreignField: "partnerId",
          as: "partnerDetails",
        },
      },
      {
        $lookup: {
          from: "partnerservices",
          localField: "_id",
          foreignField: "partnerId",
          as: "partnerServices",
        },
      },
      {
        $project: {
          email: 1,
          username: 1,
          mobile: 1,
          firstName: 1,
          lastName: 1,
          createdAt: 1,
          updateAt: 1,
          partnerDetails: {
            $cond: {
              if: { $eq: ["$partnerDetails", []] },
              then: null,
              else: { $arrayElemAt: ["$partnerDetails", 0] },
            },
          },
          partnerServices: {
            $cond: {
              if: { $eq: ["$partnerServices", []] },
              then: null,
              else: { $arrayElemAt: ["$partnerServices", 0] },
            },
          },
        },
      },
    ]);
    if (partner != null) {
      res.json({ status: true, data: partner[0] });
    } else {
      res.json({ status: false, message: "Data not found!" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Inserting partner details
exports.partnerDetail = async function (req, res) {
  const {
    fatherName,
    alternateMobile,
    uniqueIdentityNumber,
    gender,
    dob,
    referencedBy,
    maritalStatus,
    partnerId,
    localStreetNumber,
    localStreet,
    localCity,
    localPincode,
    localState,
    localLandMark,
    permanentStreetNumber,
    permanentStreet,
    permanentCity,
    permanentPincode,
    permanentState,
    permanentLandMark,
    longitude,
    latitude,
  } = req.body;
  const dobDate = new Date(dob).toISOString();
  const imageUrl = "/uploads/partners/" + req.file.filename;
  const address = {
    local: {
      streetNumber: localStreetNumber,
      street: localStreet,
      city: localCity,
      pincode: localPincode,
      state: localState,
      landMark: localLandMark,
    },
    permanent: {
      streetNumber: permanentStreetNumber,
      street: permanentStreet,
      city: permanentCity,
      pincode: permanentPincode,
      state: permanentState,
      landMark: permanentLandMark,
    },
    location: {
      coordinates: [longitude, latitude],
    },
  };

  const dataFormat = {
    fatherName,
    alternateMobile,
    uniqueIdentityNumber,
    gender,
    address,
    dob: dobDate,
    image: imageUrl,
    referencedBy,
    maritalStatus,
    partnerId,
  };

  try {
    await new PartnerDetail(dataFormat).save((err, response) => {
      if (err) res.json({ status: false, message: err });
      else {
        res.json({ status: true, message: "Data saved successfully" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//update partner partnerDetails
exports.updatePartnerDetail = async function (req, res) {
  const {
    fatherName,
    alternateMobile,
    uniqueIdentityNumber,
    gender,
    dob,
    referencedBy,
    maritalStatus,
    partnerId,
    localStreetNumber,
    localStreet,
    localCity,
    localPincode,
    localState,
    localLandMark,
    permanentStreetNumber,
    permanentStreet,
    permanentCity,
    permanentPincode,
    permanentState,
    permanentLandMark,
    longitude,
    latitude,
  } = req.body;
  const dobDate = new Date(dob).toISOString();

  //convert address fields to address objects
  const address = {
    local: {
      streetNumber: localStreetNumber,
      street: localStreet,
      city: localCity,
      pincode: localPincode,
      state: localState,
      landMark: localLandMark,
    },
    permanent: {
      streetNumber: permanentStreetNumber,
      street: permanentStreet,
      city: permanentCity,
      pincode: permanentPincode,
      state: permanentState,
      landMark: permanentLandMark,
    },
    location: {
      coordinates: [longitude, latitude],
    },
  };

  const queryPartner = { _id: partnerId };
  const queryPartnerDetail = { partnerId: partnerId };
  const updatePartner = {
    firstName,
    lastName,
    mobile,
  };
  const updatePartnerDetail = {
    fatherName,
    alternateMobile,
    uniqueIdentityNumber,
    gender,
    address,
    dob: dobDate,
    referencedBy,
    maritalStatus,
  };

  try {
    await Partner.findOneAndUpdate(
      queryPartner,
      updatePartner,
      { new: true },
      (err, response) => {
        if (err) res.json({ status: false, message: err.message });
        else {
          PartnerDetail.findOneAndUpdate(
            queryPartnerDetail,
            updatePartnerDetail,
            { new: true },
            (err2, result) => {
              if (err2) res.json({ status: false, message: err2.messages });
              else {
                return res.json({
                  status: true,
                  message: "Data updated successfully",
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.updatePartnerImage = async function (req, res) {
  const url = "/uploads/partners/" + req.file.filename;
  try {
    await PartnerDetail.findOne(
      { partnerId: req.body.partnerId },
      { image: 1 },
      (err, result) => {
        if (err) return res.json({ status: false, message: err.message });
        if (result != null && result.image === url) {
          return res.json({
            status: true,
            message: "Image successfully updated",
          });
        } else {
          res.json({ status: false, message: "Data not found" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.getPartnerDetailById = async function (req, res) {
  try {
    const { partnerId } = req.params;
    //get partner details
    const partner = await Partner.aggregate([
      {
        $match: { _id: Mongoose.Types.ObjectId(partnerId), isDeleted: null },
      },
      {
        $lookup: {
          from: "partnerdetails",
          localField: "_id",
          foreignField: "partnerId",
          as: "partnerDetails",
        },
      },
      {
        $unwind: "$partnerDetails",
      },
      {
        $lookup: {
          from: "partnerservices",
          localField: "_id",
          foreignField: "partnerId",
          as: "partnerServices",
        },
      },
      {
        $unwind: "$partnerServices",
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);

    if (partner != null && partner.length > 0) {
      return res.json({ status: true, data: partner[0] });
    } else {
      return res.json({
        status: false,
        message: "Data not found",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get all partners details
exports.getPartnerDetails = async function (req, res) {
  try {
    const partner = await Partner.aggregate([
      {
        $lookup: {
          from: "partnerdetails",
          localField: "_id",
          foreignField: "partnerId",
          as: "partnerDetails",
        },
      },
      {
        $unwind: "$partnerDetails",
      },
      {
        $lookup: {
          from: "partnerservices",
          localField: "_id",
          foreignField: "partnerId",
          as: "partnerServices",
        },
      },
      {
        $unwind: "$partnerServices",
      },
      {
        $lookup: {
          from: "services",
          localField: "partnerServices.serviceId",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: "$service",
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);

    if (partner != null && partner.length > 0) {
      return res.json({ status: true, data: partner });
    } else {
      return res.json({
        status: false,
        message: "Data not found",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// partner approval updates
exports.partnerApproval = async function (req, res) {
  try {
    const { partnerId } = req.body;
    await PartnerDetail.findOneAndUpdate(
      { partnerId },
      { isApproved: new Date() },
      { new: true },
      (err, result) => {
        if (err) return res.json({ status: false, message: err.message });
        if (result != null) {
          return res.json({
            status: true,
            message: "Partner Approved Successfully",
          });
        } else {
          return res.json({ status: false, message: "Something went wrong" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
