const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");
const User = require("../models/user");
const { generateUsername } = require("../services/generateUsername");

exports.createUser = async function (req, res) {
  const { firstName, lastName, email, mobile, password } = req.body;
  try {
    // this class is used for encrypting passwords with some our keywords or salt for example i am passing 10
    const salt = bcrypt.genSalt(parseInt(process.env.SALT_KEY), (err, salt) => {
      if (err) res.json({ status: false, message: "Error " + err });
      else if (salt == null)
        res.json({ status: false, message: "Something is missing " });
      else {
        // password encrypting start
        bcrypt.hash(password, salt, async (err2, hash) => {
          if (err2)
            return res.json({
              status: false,
              message: "Password is not correct!",
            });
          if (hash) {
            const user = await User.find({});
            const username = generateUsername(firstName, user);

            await new User({
              firstName,
              lastName,
              mobile,
              username,
              password: hash,
              email,
            }).save((err3, response) => {
              if (err3)
                return res.json({
                  status: false,
                  message: "Mobile number and email should be unique!",
                });

              //jwt token generating
              const token = jwt.sign(
                { mobile: response.mobile, id: response._id },
                process.env.JWT_KEY,
                {
                  expiresIn: "7d",
                }
              );
              return res.json({
                status: true,
                message: "Account successfully created!",
                token,
              });
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//user login
exports.userLogin = async function (req, res) {
  const { username, password } = req.body;
  try {
    await User.findOne(
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
            message: "Credential does not exist.",
          });
        if (result != null) {
          bcrypt.compare(password, result.password, (error, response) => {
            if (error) {
              return res.json({
                status: false,
                message: error.message,
              });
            }
            if (response != null) {
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
            message: "Username doesn't exist",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//User detail
exports.getUser = async function (req, res) {
  try {
    const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);
    const user = await User.findOne(
      {
        _id: id,
      },
      { password: 0 }
    );
    if (user) {
      res.json({ status: true, data: user });
    } else {
      res.json({ status: false, message: "Data not found!" });
    }
  } catch (error) {
    console.log(error);
  }
};

//update user profile
exports.updateUserProfile = async function (req, res) {
  try {
    const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);
    const { firstName, lastName, alternateMobile, address, dob } = req.body;
    const query = { _id: id };
    const updateData = {
      firstName,
      lastName,
      alternateMobile,
      address,
      dob,
    };
    await User.findOneAndUpdate(
      query,
      updateData,
      { new: true },
      (err, result) => {
        if (err) return res.json({ status: false, message: err });
        return res.json({ status: true, message: "Data updated successfully" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//get all users
exports.updateUserImage = async function (req, res) {
  try {
    const imageUrl = "/uploads/users/" + req.file.filename;
    const { id } = jwt.verify(req.header("Authorization"), process.env.JWT_KEY);
    await User.findOneAndUpdate(
      { _id: Mongoose.Types.ObjectId(id) },
      { image: imageUrl },
      { new: true },
      (err, result) => {
        if (err) return res.json({ status: false, message: err.message });
        return res.json({
          status: true,
          message: "Image uploaded successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
//get all users
exports.getAllUsers = async function (req, res) {
  try {
    await User.find(
      { isDeleted: null },
      {
        password: 0,
      },
      (err, result) => {
        if (err) return res.json({ status: false, message: err });
        return res.json({ status: true, result });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
