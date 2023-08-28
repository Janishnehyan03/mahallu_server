const Entry = require("../models/entryModel");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const { academicStage, jobType } = req.query;

    let query = {};

    if (academicStage) {
      query.academicStage = academicStage;
    }

    if (jobType) {
      query["jobType." + jobType] = true;
    }

    const entries = await Entry.find(query);

    entries.forEach(async (entry) => {
      // Send SMS logic here
      console.log(`Sending SMS to ${entry.name} at ${entry.mobileNumber}`);
    });

    res
      .status(200)
      .json({
        message: "SMS sent to selected entries",
        count: entries.length,
        entries,
      });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
