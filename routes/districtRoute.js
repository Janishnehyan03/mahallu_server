// district.js
const mongoose = require("mongoose");
const { protect, restrictTo } = require("../controllers/userController");
const router = require("express").Router();

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "district is already created"],
    uppercase: true,
  },
  state: {
    type: String,
    required: true,
    uppercase: true,
    enum: [
      "ANDHRA PRADESH",
      "ARUNACHAL PRADESH",
      "ASSAM",
      "BIHAR",
      "CHHATTISGARH",
      "GOA",
      "GUJARAT",
      "HARYANA",
      "HIMACHAL PRADESH",
      "JHARKHAND",
      "KARNATAKA",
      "KERALA",
      "MADHYA PRADESH",
      "MAHARASHTRA",
      "MANIPUR",
      "MEGHALAYA",
      "MIZORAM",
      "NAGALAND",
      "ODISHA",
      "PUNJAB",
      "RAJASTHAN",
      "SIKKIM",
      "TAMIL NADU",
      "TELANGANA",
      "TRIPURA",
      "UTTAR PRADESH",
      "UTTARAKHAND",
      "WEST BENGAL",
    ],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const District = mongoose.model("District", districtSchema);
module.exports = { District };

// Create a new district
router.post("/", protect, restrictTo("superAdmin"), async (req, res, next) => {
  try {
    const { name, state } = req.body;
    const district = new District({ name, state });
    await district.save();
    res.status(201).json(district);
  } catch (error) {
    next(error);
  }
});

// Read all
router.get("/", async (req, res, next) => {
  try {
    const districts = await District.find();
    res.status(200).json({ results: districts.length, districts });
  } catch (error) {
    next(error);
  }
});

// Read a specific district by ID
router.get("/:id", async (req, res, next) => {
  try {
    const district = await District.findById(req.params.id);
    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }
    res.status(200).json(district);
  } catch (error) {
    next(error);
  }
});

// Update a district by ID
router.put("/:id", async (req, res, next) => {
  try {
    const district = await District.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }
    res.status(200).json(district);
  } catch (error) {
    next(error);
  }
});

// Delete a district by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const district = await District.findByIdAndDelete(req.params.id);
    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }
    res.status(204).json({ message: "District deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
