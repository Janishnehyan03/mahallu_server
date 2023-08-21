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
    const formNumber = (existingEntries.length + 1).toString().padStart(4, "0");
    const mahallu = await Mahallu.findById(req.user.mahallu);

    const newEntry = await Entry.create({
      ...req.body,
      formNumber,
      district: mahallu.district,
    });

    res.status(201).json({
      status: "success",
      data: {
        newEntry,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getOneEntry = getOne(
  Entry,
  { path: "district", fields: ["name"] },
  { path: "mahallu", fields: ["name"] }
);
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
