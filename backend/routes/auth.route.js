const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login)
router.post("/register", authController.register)
router.post("/orgregister", authController.orgregister)
// router.get("/testing", authController.testingget)

module.exports = router;