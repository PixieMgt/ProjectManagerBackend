const express = require("express");
const router = express.Router();

const validate = require("../middleware/validation.middleware");
const { registerSchema, loginSchema } = require("../validation/auth.schema");
const {
  register,
  login,
  logout,
  getCurrentUser,
  refresh,
} = require("../controllers/authentication.controller");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", getCurrentUser);
router.post("/refresh", refresh);

module.exports = router;
