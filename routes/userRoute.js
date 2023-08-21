const {
  login,
  signUp,
  getAllUsers,
  protect,
  restrictTo,
  updateMe,
  getOneUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", login);
router.patch("/me/:id", protect, updateMe);
router.get("/", protect, restrictTo("superAdmin"), getAllUsers);
router.route("/:id").get(protect, getOneUser);

module.exports = router;
