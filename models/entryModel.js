const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    mahallu: {
      type: mongoose.Types.ObjectId,
      ref: "Mahallu",
      required: [true, "Mahallu is required"],
    },
    district: {
      type: mongoose.Types.ObjectId,
      ref: "District",
      required: [true, "District is required"],
    },
    // LKG, UKG, 1,2,3,4,5,6,7,...
    academicStage: {
      type: String,
      default:null,
      enum: [
        "LKG",
        "UKG", // Kindergarten
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5", // Primary School
        "Class 6",
        "Class 7",
        "Class 8", // Middle School
        "Class 9",
        "Class 10", // High School
        "Class 11",
        "Class 12", // Junior College/Intermediate
        "Undergraduate",
        "Master's",
        "Doctorate", // Higher Education
      ],
    },
    formNumber: { type: String, required: [true, "Form Number is required"] },
    houseNumber: { type: String, required: [true, "House Number is required"] },
    dateOfSurvey: {
      type: Date,
      required: [true, "Date of Survey is required"],
      default: Date.now(),
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female"],
    },
    dob: { type: Date, required: [true, "Date of Birth is required"] },
    mobileNumber: {
      type: String,
      required: [true, "Mobile Number is required"],
    },
    educationalQualification: { type: String, required: false },
    institutionOfStudy: { type: String, required: false },
    religiousEducation: { type: String, required: false },
    materialEducation: { type: String, required: true },
    jobDetails: { type: String, required: false },
    bloodGroup: { type: String, required: false },
    jobType: {
      govtService: { type: Boolean, required: false },
      privateSector: { type: Boolean, required: false },
      dailyWage: { type: Boolean, required: false },
    },
    govtAllowance: {
      pention: { type: Boolean, required: false },
      scholarship: { type: Boolean, required: false },
      other: { type: String, required: false },
    },
    houseOwnership: {
      own: { type: Boolean, required: false },
      rent: { type: Boolean, required: false },
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
