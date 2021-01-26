const jwt = require("jsonwebtoken");

exports.checkAuth = async function (req, res, next) {
  try {
    const decode = jwt.verify(
      req.headers("Authorization"),
      process.env.JWT_KEY
    );
    if (decode == null)
      return res.json({ status: false, message: "You are not Authenticated!" });
    else {
      next();
    }
  } catch (error) {
    res.json({ status: false });
  }
};
