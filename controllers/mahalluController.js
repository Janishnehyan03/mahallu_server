const mongoose = require("mongoose");
const Mahallu = require("../models/mahalluModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../utils/globalFunctions");

exports.createMahallu = createOne(Mahallu);
exports.getAllMahallu = getAll(Mahallu);
exports.getMahallu = getOne(Mahallu);
exports.updateMahallu = updateOne(Mahallu);
exports.deleteMahallu = deleteOne(Mahallu);

exports.getMahalluDetails = async function fetchMahalluWithDetails(
  req,
  res,
  next
) {
  try {
    const mahalluId = new mongoose.Types.ObjectId(req.params.id);
    const result = await Mahallu.aggregate([
      // Match the specific Mahallu
      { $match: { _id: mahalluId } },
      // Lookup entries related to the Mahallu
      {
        $lookup: {
          from: "entries",
          localField: "_id",
          foreignField: "mahallu",
          as: "entries",
        },
      },
      // Unwind the entries array
      { $unwind: "$entries" },
      // Exclude deleted entries
      { $match: { "entries.deleted": { $ne: true } } },
      // Group by Mahallu details and calculate counts
      {
        $group: {
          _id: "$_id",
          totalEntries: { $sum: 1 },
          maleCount: {
            $sum: { $cond: [{ $eq: ["$entries.gender", "male"] }, 1, 0] },
          },
          femaleCount: {
            $sum: { $cond: [{ $eq: ["$entries.gender", "female"] }, 1, 0] },
          },
          govtServiceCount: {
            $sum: {
              $cond: [{ $eq: ["$entries.jobType.govtService", true] }, 1, 0],
            },
          },
          privateSectorCount: {
            $sum: {
              $cond: [{ $eq: ["$entries.jobType.privateSector", true] }, 1, 0],
            },
          },
          dailyWageCount: {
            $sum: {
              $cond: [{ $eq: ["$entries.jobType.dailyWage", true] }, 1, 0],
            },
          },
          academicStages: {
            $push: {
              stage: "$entries.academicStage",
              count: 1,
            },
          },
        },
      },
      // Reshape the academicStages array into an object
      {
        $addFields: {
          academicStages: {
            $map: {
              input: "$academicStages",
              as: "stage",
              in: {
                k: { $ifNull: ["$$stage.stage", "null"] },
                v: "$$stage.count",
              },
            },
          },
        },
      },
      // Project the final response fields
      {
        $project: {
          _id: 1,
          totalEntries: 1,
          maleCount: 1,
          femaleCount: 1,
          govtServiceCount: 1,
          privateSectorCount: 1,
          dailyWageCount: 1,
          academicStages: { $arrayToObject: "$academicStages" },
        },
      },
    ]);

    res.status(200).json(result[0]); // Send the response
  } catch (error) {
    next(error);
  }
};

exports.getAllMahalluOverview = async function fetchAllMahalluOverview(
  req,
  res,
  next
) {
  try {
    const result = await Mahallu.aggregate([
      { $match: { deleted: { $ne: true } } },
      {
        $lookup: {
          from: "entries",
          localField: "_id",
          foreignField: "mahallu",
          as: "entries",
        },
      },
      { $unwind: "$entries" },
      { $match: { "entries.deleted": { $ne: true } } },
      {
        $group: {
          _id: null,
          totalEntries: { $sum: 1 },
          maleCount: {
            $sum: { $cond: [{ $eq: ["$entries.gender", "male"] }, 1, 0] },
          },
          femaleCount: {
            $sum: { $cond: [{ $eq: ["$entries.gender", "female"] }, 1, 0] },
          },
          govtServiceCount: {
            $sum: {
              $cond: [{ $eq: ["$entries.jobType.govtService", true] }, 1, 0],
            },
          },
          privateSectorCount: {
            $sum: {
              $cond: [{ $eq: ["$entries.jobType.privateSector", true] }, 1, 0],
            },
          },
          dailyWageCount: {
            $sum: {
              $cond: [{ $eq: ["$entries.jobType.dailyWage", true] }, 1, 0],
            },
          },
          academicStages: {
            $addToSet: {
              stage: "$entries.academicStage",
              count: 1,
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalEntries: 1,
          maleCount: 1,
          femaleCount: 1,
          govtServiceCount: 1,
          privateSectorCount: 1,
          dailyWageCount: 1,
          academicStages: 1,
        },
      },
      {
        $addFields: {
          academicStages: {
            $map: {
              input: "$academicStages",
              as: "stage",
              in: {
                k: { $ifNull: ["$$stage.stage", "null"] },
                v: "$$stage.count",
              },
            },
          },
        },
      },
      
      {
        $project: {
          totalEntries: 1,
          maleCount: 1,
          femaleCount: 1,
          govtServiceCount: 1,
          privateSectorCount: 1,
          dailyWageCount: 1,
          academicStages: { $arrayToObject: "$academicStages" },
        },
      },
    ]);

    if (result.length === 0) {
      res.status(404).json({ message: "No data found" });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    next(error);
  }
};
