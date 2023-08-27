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
    headOfTheFamily: {
      type: String,
      required: [true, "Head of the Family is required"],
    },
    formNumber: { type: String, required: [true, "Form Number is required"] },
    houseNumber: { type: String, required: [true, "House Number is required"] },
    contactNumber: {
      type: String,
      required: [true, "Contact Number is required"],
    },
    dateOfSurvey: {
      type: Date,
      required: [true, "Date of Survey is required"],
      default: Date.now(),
    },
    areaCode: { type: String, required: [true, "Area Code is required"] },
    numberOfFamilyMembers: {
      type: Number,
      required: [true, "Number of Family Members is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female"],
    },
    dob: { type: Date, required: [true, "Date of Birth is required"] },
    relationWithHead: {
      type: String,
      required: [true, "Relation with Head of Family is required"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile Number is required"],
    },
    maritalStatus: { type: String, required: false },
    educationalQualification: { type: String, required: false },
    institutionOfStudy: { type: String, required: false },
    religiousEducation: { type: String, required: false },
    materialEducation: { type: String, required: true },
    jobDetails: { type: String, required: false },
    health: { type: String, required: false },
    bloodGroup: { type: String, required: false },
    jobType: {
      govtService: { type: Boolean, required: false },
      privateSector: { type: Boolean, required: false },
      dailyWage: { type: Boolean, required: false },
    },
    suggestions: { type: String, required: false },
    remarks: { type: String, required: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
