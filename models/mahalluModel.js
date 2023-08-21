const mongoose = require("mongoose");

const mahalluSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Mahallu Name is required"],
    unique: [true, "mahallu is already created"],
    uppercase: true,
  },
  district: {
    type: mongoose.Types.ObjectId,
    required: [true, "Mahallu Name is required"],
    ref: "District",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  mahalluNumber: {
    type: String,
    required: [true, "Mahallu Number is required"],
  },
});

const Mahallu = mongoose.model("Mahallu", mahalluSchema);
module.exports = Mahallu;
