const {
  createMahallu,
  getAllMahallu,
  getMahallu,
  updateMahallu,
  deleteMahallu,
  getMahalluDetails,
  getAllMahalluOverview,
} = require("../controllers/mahalluController");
const { protect, restrictTo } = require("../controllers/userController");

const router = require("express").Router();

router.post("/", protect, restrictTo("superAdmin"), createMahallu);
router.get("/", getAllMahallu);
router.get("/details/:id", protect, getMahalluDetails);
router.post("/details/", protect, getAllMahalluOverview);
router
  .route("/:id")
  .get(getMahallu)
  .patch(protect, restrictTo("superAdmin", updateMahallu))
  .delete(protect, restrictTo("superAdmin", deleteMahallu));

module.exports = router;
