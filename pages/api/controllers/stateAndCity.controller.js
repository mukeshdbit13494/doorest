const StateAndCity = require("../models/stateAndCity");

exports.createStateAndCity = async function (req, res) {
  try {
    const { state, city, isActive } = req.body;
    const saveRes = new StateAndCity({
      state,
      city,
      isActive,
    });

    saveRes.save((err, result) => {
      if (err) return res.json({ status: false, message: err.message });
      if (result != null) {
        return res.json({
          status: true,
          message: "Data saved successfully",
        });
      } else {
        return res.json({
          status: false,
          message: "Data not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getAllStateAndCity = async function (req, res) {
  try {
    const stateAndCity = await StateAndCity.find({});
    if (stateAndCity != null && stateAndCity.length > 0) {
      return res.json({ status: true, data: stateAndCity });
    } else {
      return res.json({ status: false, data: [], message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
