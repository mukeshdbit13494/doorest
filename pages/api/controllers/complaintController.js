const Complaint = require("../models/complaint");
const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");

//send complaints
exports.sendComplaint = async function (req, res) {
  const { subject, complainBody, userType } = req.body;
  const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);

  try {
    let userId = null,
      partnerId = null;
    if (userType.toLowerCase() === "user") {
      userId = id;
    } else {
      partnerId = id;
    }

    await new Complaint({
      subject,
      complainBody,
      partnerId,
      userId,
    }).save((err, result) => {
      if (err) return res.json({ status: false, message: err.message });
      if (result) {
        return res.json({
          status: true,
          message: "Complait sent successfully",
        });
      } else {
        return res.json({
          status: false,
          message: "Something went wrong in your fields",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//isRead true when admin read complaint
exports.readComplaints = async function (req, res) {
  const complaintId = Mongoose.Types.ObjectId(req.body.complaintId);
  try {
    await Complaint.update(
      { _id: complaintId },
      { isRead: true },
      { new: true },
      (err, result) => {
        if (err) return res.json({ status: false, message: err.message });
        if (result) {
          return res.json({ status: true, message: "Complaint read" });
        } else {
          return res.json({ status: false, message: "Data not found" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//to getting all partners complaints and thier profile
exports.getAllUserComplaints = async function (req, res) {
  try {
    const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);
    const result = await Complaint.aggregate([
      {
        $match: { isDeleted: null, userId: Mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $unwind: "$users",
      },
      {
        $project: {
          _id: 1,
          partnerId: 1,
          isDeleted: 1,
          isRead: 1,
          subject: 1,
          complainBody: 1,
          createdAt: 1,
          user: {
            firstName: "$users.firstName",
            lastName: "$users.lastName",
            email: "$users.email",
            mobile: "$users.mobile",
            image: "$users.image",
          },
        },
      },
    ]);
    if (result != null) {
      return res.json({ status: true, data: result });
    } else {
      return res.json({ status: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

//to getting all partners complaints and thier profile
exports.getAllPartnerComplaints = async function (req, res) {
  try {
    const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);
    const result = await Complaint.aggregate([
      {
        $match: {
          partnerId: Mongoose.Types.ObjectId(id),
          isDeleted: null,
          userId: null,
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partnerId",
          foreignField: "_id",
          as: "partners",
        },
      },
      {
        $unwind: "$partners",
      },
      {
        $lookup: {
          from: "partnerdetails",
          localField: "partners._id",
          foreignField: "partnerId",
          as: "partnerDetails",
        },
      },
      {
        $unwind: "$partnerDetails",
      },

      {
        $project: {
          _id: 1,
          partnerId: 1,
          isDeleted: 1,
          isRead: 1,
          subject: 1,
          complainBody: 1,
          createdAt: 1,
          partner: {
            firstName: "$partners.firstName",
            lastName: "$partners.lastName",
            email: "$partners.email",
            mobile: "$partners.mobile",
            image: "$partnerDetails.image",
          },
        },
      },
    ]);
    if (result != null) {
      return res.json({ status: true, data: result });
    } else {
      return res.json({ status: false, message: "Data not found", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
};

//user get sent complaints
exports.getUserSentComplaints = async function (req, res) {
  try {
    const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);
    const complaints = await Complaints.find({
      userId: Mongoose.Types.ObjectId(id),
    });
    if (complaints != null) {
      return res.json({ status: true, data: complaints });
    } else {
      return res.json({ status: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

//user delete sent complaints
exports.getUserSentComplaints = async function (req, res) {
  const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);
  const { complaintId } = req.body;
  const query = {
    userId: Mongoose.Types.ObjectId(id),
    _id: Mongoose.Types.ObjectId(complaintId),
  };
  const updateData = { isDeleted: new Date().toISOString() };
  try {
    await Complaint.findByIdAndUpdate(
      query,
      updateData,
      { new: true },
      (err, result) => {
        if (err) return res.json({ status: false, message: err.message });
        if (result) {
          return res.json({
            status: true,
            message: "Complaint Deleted successfully",
          });
        } else {
          return res.json({ status: false, message: "Data not found" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//partner get sent complaints
exports.getPartnerSentComplaints = async function (req, res) {
  const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);
  try {
    const complaints = await Complaint.find({
      partnerId: Mongoose.Types.ObjectId(id),
    });
    if (complaints != null) {
      return res.json({ status: true, data: complaints });
    } else {
      return res.json({ status: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

//partner delete sent complaints
exports.partnerDeleteComplaint = async function (req, res) {
  try {
    const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);
    const { complaintId } = req.params;
    const query = {
      partnerId: Mongoose.Types.ObjectId(id),
      _id: Mongoose.Types.ObjectId(complaintId),
    };
    const updateData = { isDeleted: new Date().toISOString() };
    await Complaint.findByIdAndUpdate(
      query,
      updateData,
      { new: true },
      (err, result) => {
        if (err) return res.json({ status: false, message: err.message });
        if (result) {
          return res.json({
            status: true,
            message: "Complaint Deleted successfully",
          });
        } else {
          return res.json({ status: false, message: "Data not found" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
