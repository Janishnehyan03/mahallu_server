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
      enum: ["male", "female"],
    },
    maritalStatus: {
      type: String,
      enum: ["Married", "Unmarried", "Widow/er"],
    },
    educationalSubject: {
      type: String,
      enum: ["Science", "Humanities", "Commerce"],
    },
    dob: { type: String, required: [true, "Date of Birth is required"] },
    mobileNumber: {
      type: String,
      required: [true, "Mobile Number is required"],
    },
    educationalSubject: {
      type: String,
      enum: ["Science", "Humanities", "Commerce"],
    },
    institutionOfStudy: {
      type: String,
      enum: [
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
      enum: ["Dars", "Arabic Collage", "Madrasa"],
    },
    materialEducation: {
      type: String,
      enum: [
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
      enum: ["Government Service", "Private Sector", "Daily Wage", "Gulf"],
    },
    govtType: { type: String, enum: ["Gazatted", "Grade A", "Grade A"] },
    pensions: {
      type: String,
      enum: [
        "Widow Pension",
        "Agricultural Pension",
        "Govt Retired Pension",
        "Other",
      ],
    },
    profession: {
      type: String,
      enum: [
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
      enum: ["Diabetes", "Hypertension", "Kidney Disease", "Cancer", "Healthy"],
    },
    degree: {
      type: String,
      enum: [
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
      enum: [
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
      enum: [
        "INSPIRE Scholarship",
        "National Talent Search Examination (NTSE)",
        "Kishore Vaigyanik Protsahan Yojana (KVPY)",
        "Maulana Azad National Fellowship for Minority Students",
        "Dr APJ Abdul Kalam Global Skills Scholarship",
        "GIIS Global Citizen Scholarship",
        "Vidyadhan Scholarship",
        "HDFC Bank Parivartan's ECS Scholarship",
        "CLP India Scholarship Scheme",
        "SJE Scholarship",
        "MP Scholarship Portal",
      ],
    },
    // govtAllowance: {
    //   type: String,
    //   enum:['']
    // },
    houseOwnership: {
      type: String,
      enum: ["own", "rent", "not own"],
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
