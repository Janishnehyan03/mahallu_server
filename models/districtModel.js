const mongoose = require("mongoose");

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
  module.exports = District 