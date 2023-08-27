const express = require("express");
const router = express.Router();
const {
  createEntry,
  getOneEntry,
  getAllEntries,
  getMyMahallu,
  updateEntry,
  deleteEntry,
  getHome,
} = require("../controllers/entryController");
const { protect, restrictTo } = require("../controllers/userController");

router.post("/", protect, restrictTo("admin", "superAdmin"), createEntry);
router.get("/", protect, restrictTo("superAdmin"), getAllEntries);
router.get("/my-mahallu/data", protect, restrictTo("admin"), getMyMahallu);
router.get("/home/data", protect, getHome);

router
  .route("/:id")
  .get(getOneEntry)
  .patch(protect, restrictTo("admin"), updateEntry)
  .delete(protect, restrictTo("admin"), deleteEntry);

module.exports = router;
