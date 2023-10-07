const {
  login,
  signUp,
  getAllUsers,
  protect,
  restrictTo,
  updateMe,
  getOneUser,
  forgotPassword,
  resetPassword,
  logout,
  verifyToken,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", login);
router.patch("/me/:id", protect, updateMe);
router.get("/", protect, restrictTo("superAdmin"), getAllUsers);
router.route("/:id").get(protect, getOneUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", protect, resetPassword);
router.post("/logout", logout);
router.get("/token/check-login", verifyToken);

module.exports = router;
