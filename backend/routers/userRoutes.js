const express = require("express");
// const authMiddleware = require("../middleware/authMiddleware");

const {
  registerController,
  loginController,
  allPlacesController,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get('/allplaces', allPlacesController)

module.exports = router;
