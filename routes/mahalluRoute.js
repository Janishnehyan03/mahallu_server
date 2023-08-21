const {
  createMahallu,
  getAllMahallu,
} = require("../controllers/mahalluController");
const { protect, restrictTo } = require("../controllers/userController");

const router = require("express").Router();

router.post("/", protect, restrictTo("superAdmin"), createMahallu);
router.get("/", getAllMahallu);

module.exports = router;
