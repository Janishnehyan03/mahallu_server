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

exports.getMahalluDetails = async function fetchMahalluWithDetails(req, res, next) {
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
          marriedCount: {
            $sum: { $cond: [{ $eq: ["$entries.maritalStatus", "Married"] }, 1, 0] },
          },
          unmarriedCount: {
            $sum: { $cond: [{ $eq: ["$entries.maritalStatus", "Unmarried"] }, 1, 0] },
          },
          widowCount: {
            $sum: { $cond: [{ $eq: ["$entries.maritalStatus", "Widow/er"] }, 1, 0] },
          },
          scienceCount: {
            $sum: { $cond: [{ $eq: ["$entries.educationalSubject", "Science"] }, 1, 0] },
          },
          humanitiesCount: {
            $sum: { $cond: [{ $eq: ["$entries.educationalSubject", "Humanities"] }, 1, 0] },
          },
          commerceCount: {
            $sum: { $cond: [{ $eq: ["$entries.educationalSubject", "Commerce"] }, 1, 0] },
          },
          governmentServiceCount: {
            $sum: { $cond: [{ $eq: ["$entries.jobType", "Government Service"] }, 1, 0] },
          },
          privateSectorCount: {
            $sum: { $cond: [{ $eq: ["$entries.jobType", "Private Sector"] }, 1, 0] },
          },
          dailyWageCount: {
            $sum: { $cond: [{ $eq: ["$entries.jobType", "Daily Wage"] }, 1, 0] },
          },
          
          doctorCount: {
            $sum: { $cond: [{ $eq: ["$entries.profession", "Doctor"] }, 1, 0] },
          },
          teacherCount: {
            $sum: { $cond: [{ $eq: ["$entries.profession", "Teacher"] }, 1, 0] },
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
          marriedCount: 1,
          unmarriedCount: 1,
          widowCount: 1,
          scienceCount: 1,
          humanitiesCount: 1,
          commerceCount: 1,
          governmentServiceCount: 1,
          privateSectorCount: 1,
          dailyWageCount: 1,
          // Project additional fields
          doctorCount: 1,
          teacherCount: 1,
          // Project more fields as per requirements
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
          from: 'entries',
          localField: '_id',
          foreignField: 'mahallu',
          as: 'entries',
        },
      },
      { $unwind: '$entries' },
      { $match: { 'entries.deleted': { $ne: true } } },
      {
        $group: {
          _id: null,
          totalEntries: { $sum: 1 },
          maleCount: {
            $sum: { $cond: [{ $eq: ['$entries.gender', 'male'] }, 1, 0] },
          },
          femaleCount: {
            $sum: { $cond: [{ $eq: ['$entries.gender', 'female'] }, 1, 0] },
          },
          marriedCount: {
            $sum: { $cond: [{ $eq: ['$entries.maritalStatus', 'Married'] }, 1, 0] },
          },
          unmarriedCount: {
            $sum: { $cond: [{ $eq: ['$entries.maritalStatus', 'Unmarried'] }, 1, 0] },
          },
          widowCount: {
            $sum: { $cond: [{ $eq: ['$entries.maritalStatus', 'Widow/er'] }, 1, 0] },
          },
          scienceCount: {
            $sum: { $cond: [{ $eq: ['$entries.educationalSubject', 'Science'] }, 1, 0] },
          },
          humanitiesCount: {
            $sum: { $cond: [{ $eq: ['$entries.educationalSubject', 'Humanities'] }, 1, 0] },
          },
          commerceCount: {
            $sum: { $cond: [{ $eq: ['$entries.educationalSubject', 'Commerce'] }, 1, 0] },
          },
          govtServiceCount: {
            $sum: { $cond: [{ $eq: ['$entries.jobType', 'Govt. Service'] }, 1, 0] },
          },
          privateSectorCount: {
            $sum: { $cond: [{ $eq: ['$entries.jobType', 'Private Sector'] }, 1, 0] },
          },
          dailyWageCount: {
            $sum: { $cond: [{ $eq: ['$entries.jobType', 'Daily Wage'] }, 1, 0] },
          },
          doctorCount: {
            $sum: { $cond: [{ $eq: ['$entries.profession', 'Doctor'] }, 1, 0] },
          },
          teacherCount: {
            $sum: { $cond: [{ $eq: ['$entries.profession', 'Teacher'] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalEntries: 1,
          maleCount: 1,
          femaleCount: 1,
          marriedCount: 1,
          unmarriedCount: 1,
          widowCount: 1,
          scienceCount: 1,
          humanitiesCount: 1,
          commerceCount: 1,
          govtServiceCount: 1,
          privateSectorCount: 1,
          dailyWageCount: 1,
          doctorCount: 1,
          teacherCount: 1,
        },
      },
    ]);

    if (result.length === 0) {
      res.status(404).json({ message: 'No data found' });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    next(error);
  }
};

