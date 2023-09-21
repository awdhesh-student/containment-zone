const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const {
  postLocationController,
  deleteLocationController,
  updateLocationController,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/postloc", authMiddleware, postLocationController);

router.delete(
  "/deleteplace/:placeid",
  authMiddleware,
  deleteLocationController
);

router.patch(
   "/updateplace/:placeid",
   authMiddleware,
   updateLocationController
 );

module.exports = router;
