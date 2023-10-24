const mongoose = require("mongoose");
const Entry = require("../models/entryModel");
const Mahallu = require("../models/mahalluModel");
const AppError = require("../utils/AppError");
const {
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("../utils/globalFunctions");

exports.createEntry = async (req, res, next) => {
  try {
    const existingEntries = await Entry.find({});
    let formNumber;
    if (!req.body.formNumber) {
      formNumber = (existingEntries.length + 1).toString().padStart(4, "0");
    } else {
      formNumber = req.body.formNumber;
    }
    const mahallu = await Mahallu.findById(req.user.mahallu);

    const data = await Entry.create({
      ...req.body,
      formNumber,
      district: mahallu.district,
      mahallu,
    });

    res.status(201).json({
      status: "success",
      formNumber: data.formNumber,
    }); 
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getOneEntry = async (req, res, next) => {
  try {
    let data = await Entry.findById(req.params.id)
      .populate("district", "name")
      .populate("mahallu", "name");
    let relatedData = await Entry.find({ formNumber: data.formNumber });
    res.status(200).json({ data, relatedData });
  } catch (error) {
    next(error);
  }
};

exports.getAllEntries = getAll(
  Entry,
  { path: "district", fields: ["name"] },
  { path: "mahallu", fields: ["name"] }
);
exports.updateEntry = async (req, res, next) => {
  try {
    let entry = await Entry.findById(req.params.id);
    if (req.user.mahallu.toString() !== entry.mahallu.toString()) {
      throw new AppError("You are not authorized to update this document", 403);
    }

    // Call the global updateOne function to update the document
    const updateOneMiddleware = updateOne(Entry);
    await updateOneMiddleware(req, res, next);
  } catch (err) {
    next(err);
  }
};
exports.deleteEntry = async (req, res, next) => {
  try {
    let entry = await Entry.findById(req.params.id);
    if (req.user.mahallu.toString() !== entry.mahallu.toString()) {
      throw new AppError("You are not authorized to update this document", 403);
    }

    // Call the global updateOne function to update the document
    const deleteOneMiddleware = deleteOne(Entry);
    await deleteOneMiddleware(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.getMyMahallu = async (req, res, next) => {
  try {
    let data = await Entry.find({ mahallu: req.user.mahallu });
    res.status(200).json({ results: data.length, data });
  } catch (error) {
    next(error);
  }
};
exports.getHome = async (req, res, next) => {
  try {
    let data = await Entry.aggregate([
      {
        $match: {
          mahallu: new mongoose.Types.ObjectId(req.user.mahallu),
          deleted: { $ne: true },
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort documents by a timestamp or date field in descending order
      },
      {
        $group: {
          _id: "$formNumber", // Grouping by formNumber
          firstDoc: { $first: "$$ROOT" }, // Selecting the first document in each group
        },
      },
      {
        $replaceRoot: { newRoot: "$firstDoc" }, // Replace the root with the selected document
      },
    ]);

    res.status(200).json({ results: data.length, data });
  } catch (error) {
    next(error);
  }
};
