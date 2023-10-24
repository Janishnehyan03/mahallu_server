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
      required: false,
    },
    educationalSubject: {
      type: String,
      enum: ["Science", "Humanities", "Commerce"],
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
      enum: ["Dars", "Arabic Collage", "Madrasa"],
    },
    materialEducation: {
      type: String,
      required: false,
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
      required: false,
    },
    govtType: { type: String, enum: ["Gazatted", "Grade A", "Grade A"] ,required: false,},
    pensions: {
      type: String,
      required: false,
      enum: [
        "Widow Pension",
        "Agricultural Pension",
        "Govt Retired Pension",
        "Other",
      ],
    },
    profession: {
      type: String,
      required: false,
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
      required: false,
      enum: ["Diabetes", "Hypertension", "Kidney Disease", "Cancer", "Healthy"],
    },
    degree: {
      type: String,
      required: false,
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
      required: false,
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
      required: false,
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
      required: false,
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
