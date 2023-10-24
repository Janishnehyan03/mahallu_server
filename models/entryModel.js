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

    formNumber: { type: String, required: [true, "Form Number is required"] },
    // houseNumber: { type: String, required: [true, "House Number is required"] },
    dateOfSurvey: {
      type: Date,
      required: [true, "Date of Survey is required"],
      default: Date.now(),
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: [null, "male", "female"],
    },
    maritalStatus: {
      type: String,
      enum: [null, "Married", "Unmarried", "Widow/er"],
      required: false,
    },
    educationalSubject: {
      type: String,
      enum: [null, "Science", "Humanities", "Commerce"],
      required: false,
    },
    dob: { type: String, required: [true, "Date of Birth is required"] },
    mobileNumber: {
      type: String,
      required: [true, "Mobile Number is required"],
    },

    institutionOfStudy: {
      type: String,
      required: false,
      enum: [
        null,
        "Government",
        "Aided",
        "Self Finance",
        "Institute of National Importance",
        "Centeral University",
        "Abroad",
        "Other",
      ],
    },
    religiousEducation: {
      type: String,
      required: false,
      enum: [null, "Dars", "Arabic Collage", "Madrasa"],
    },
    materialEducation: {
      type: String,
      required: false,
      enum: [
        null,
        "Primary",
        "Secondary",
        "10th",
        "Plus Two",
        "Predegree",
        "Degree",
        "PG",
        "Phd",
      ],
    },
    bloodGroup: { type: String, required: false },
    jobType: {
      type: String,
      enum: [
        null,
        "Govt. Service",
        "Private Sector",
        "Daily Wage",
        "Gulf",
      ],
      required: false,
    },
    govtType: {
      type: String,
      enum: [null, "Gazatted", "Grade A", "Grade A"],
      required: false,
    },
    pensions: {
      type: String,
      required: false,
      
    },
    profession: {
      type: String,
      required: false,
      enum: [
        null,
        "Doctor",
        "Nurse",
        "Scientist",
        "Teacher",
        "Self Employee",
        "Police",
        "Indian Force",
        "Driver",
        "Gulf",
        "Agriculture",
        "Kooli",
        "Central Govt",
      ],
    },
    health: {
      type: String,
      required: false,
      enum: [
        null,
        "Diabetes",
        "Hypertension",
        "Kidney Disease",
        "Cancer",
        "Healthy",
      ],
    },
    degreeTopic: {
      type: String,
      required: false,
      enum: [
        null,
        "Computer Science",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering",
        "Aerospace Engineering",
        "Chemical Engineering",
        "Biomedical Engineering",
        "Industrial Engineering",
        "Environmental Engineering",
      ],
    },
    abroad: {
      type: String,
      required: false,
      enum: [
        null,
        "Saudi",
        "Europe",
        "NRK",
        "American Continent",
        "UAE",
        "African Continent",
      ],
    },
    scholarships: {
      type: String,
      required: false,
      
    },
    // govtAllowance: {
    //   type: String,
    //   enum:['']
    // },
    houseOwnership: {
      type: String,
      required: false,
      enum: [null, "own", "rent", "not own"],
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

entrySchema.pre(/^find/, function (next) {
  //Effects all queries starts with FIND
  this.find({ deleted: { $ne: true } });
  next();
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
