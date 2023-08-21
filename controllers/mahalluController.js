const Mahallu = require("../models/mahalluModel");

exports.createMahallu = async (req, res, next) => {
  try {
    let data = await Mahallu.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.getAllMahallu = async (req, res, next) => {
  try {
    let data = await Mahallu.find();
    res.status(200).json({ results: data.length, data });
  } catch (error) {
    next(error);
  }
};
