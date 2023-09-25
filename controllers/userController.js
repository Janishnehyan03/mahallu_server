const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { getAll, updateOne, getOne } = require("../utils/globalFunctions");
const AppError = require("../utils/AppError");

exports.getAllUsers = getAll(User);
exports.getOneUser = getOne(
  User,
  { path: "district", fields: ["name", "_id"] },
  { path: "mahallu", fields: ["name", "_id"] }
);

exports.updateMe = async (req, res, next) => {
  try {
    // Check if the user is updating their own document
    if (req.user._id.toString() !== req.params.id) {
      throw new AppError("You are not authorized to update this document", 403);
    }

    // Call the global updateOne function to update the document
    const updateOneMiddleware = updateOne(User);
    await updateOneMiddleware(req, res, next);
  } catch (err) {
    next(err);
  }
}; // Signup route
exports.signUp = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, mahallu, district, address, password } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.findOne({ email });

    if (user && user.verified) {
      return res.status(400).json({ error: "Email  Already Registered" });
    } else {
      await User.findOneAndDelete({ email });
      const newUser = new User({
        name,
        email,
        phoneNumber,
        mahallu,
        district,
        address,
        password: hashedPassword,
      });
      await newUser.save();
      // let data = await sendOtp(phoneNumber, res);
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    next(error);
  }
};
// Login route
exports.login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res
        .status(401)
        .json({ error: "enter your phone number and password" });
    }
    const user = await User.findOne({ phoneNumber });
    if (!user || !bcrypt.compare(password, user.password)) {
      return res
        .status(401)
        .json({ error: "Invalid phone number or password" });
    }
    if (!user.verified) {
      return res.status(401).json({ error: "Account not verified" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3y",
    });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res
      .cookie("login_token", token, {
        httpOnly: true,
        // max age 30 days
        maxAge: decoded.exp,
      })
      .status(200);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

// Send OTP route
const sendOtp = async (phoneNumber, res) => {
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    const otp = user.generateOTP();
    await user.save();
    // Use Fast2SMS API to send OTP
    // Example using axios library
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: `Your OTP is: ${otp}`,
        language: "english",
        flash: 0,
        numbers: phoneNumber,
      },
      {
        headers: {
          authorization:
            "8lWbQtGCYSsHh47nxVJqEMPRFkjILXzg2eNZmi03A9KypdrUf1PIsylm3oVYCEi4pqNUh6cD2X7tOnWb",
        },
      }
    );
    if (response.data.return === true) {
      res.status(200).json({ message: "OTP sent successfully" });
    } else {
      res.status(400).json({ error: "OTP sending error" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// Protected middleware
exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.login_token
      ? req.cookies.login_token
      : req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: "You are not allowed to perform this action",
      });
    }
    next();
  };
};

exports.forgotPassword = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = user.generateOTP();
    // Code to send OTP to user's email or phone (implementation not shown)
    // You can use libraries like nodemailer or Twilio for this purpose
    console.log(otp);
    await user.save();

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.resetPassword = async (req, res) => {
  const { phoneNumber, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || user.isOTPExpired() || user.otp.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Reset the password and clear OTP
    user.password = newPassword;
    user.otp = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    message: "Logged out",
    success: true,
  });
};
