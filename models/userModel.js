const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  role: {
    type: String,
    required: [true, "role is required"],
    default: "user",
    enum: ["admin", "user", "superAdmin"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
    validate: {
      validator: function (value) {
        return /^[0-9]{10}$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! (10 digits)`,
    },
  },
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
  address: { type: String, required: [true, "Address is required"] },
  password: { type: String, required: [true, "Password is required"] },
  verified: { type: Boolean, required: true, default: false },
  deleted: {
    type: Boolean,
    default: false,
  },
  otp: {
    code: String,
    expiresAt: Date,
  },
});

userSchema.pre(/^find/, function (next) {
  // Exclude deleted users from the query
  this.find({ deleted: { $ne: true } });
  next();
});
userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = {
    code: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
  };
  return otp;
};

userSchema.methods.isOTPExpired = function () {
  return this.otp.expiresAt <= new Date();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
