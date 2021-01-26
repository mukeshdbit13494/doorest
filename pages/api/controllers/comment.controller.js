const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");
const UserComment = require("../models/userComment");
const User = require("../models/user");

// partner comment section start
exports.postComment = async function (req, res) {
  try {
    const { rating, comment, partnerId, id } = req.body;
    const commentResult = await UserComment.findOne({
      partnerId: Mongoose.Types.ObjectId(partnerId),
    });
    if (commentResult != null) {
      commentResult.comments.push({ rating, comment, userId: id });
      commentResult.save((err, result) => {
        if (err) return res.json({ status: false, message: err.message });
        if (result) {
          return res.json({
            status: true,
            message: "Comment successfully posted",
          });
        } else {
          return res.json({
            status: true,
            message: "Something went wrong",
          });
        }
      });
    } else {
      await new UserComment({
        partnerId,
        comments: [{ rating, comment, userId: id }],
      }).save((err, result) => {
        if (err) {
          return res.json({ status: false, message: err.message });
        }
        return res.json({ status: true, message: "Successfully commented" });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get All partners comment
exports.getPartnerComments = async function (req, res) {
  const { partnerId } = req.params;
  let allComments = [];
  let result = null;
  try {
    const userComment = await UserComment.findOne({
      partnerId: Mongoose.Types.ObjectId(partnerId),
    });
    if (userComment != null && userComment.comments != null) {
      for (const comment of userComment.comments) {
        //find user profile of each comment by userId
        const user = await User.findOne({
          _id: Mongoose.Types.ObjectId(comment.userId),
        });

        //to store or map each comment with thier keys and push into array
        allComments.push({
          status: comment.status,
          createdAt: comment.createdAt,
          _id: comment._id,
          rating: comment.rating,
          comment: comment.comment,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            email: user.email,
          },
        });
      }
      //store all data into single var
      result = {
        _id: userComment._id,
        partnerId: userComment.partnerId,
        isDeleted: userComment.isDeleted,
        comments: allComments,
      };
    }

    if (result != null) {
      return res.json({ status: true, data: result });
    } else {
      return res.json({ status: false, message: "Data not found", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
};
