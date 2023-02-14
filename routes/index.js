const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const propertiesRoutes = require("./propertiesRoutes");

router.use("/properties", propertiesRoutes);
router.use("/user", userRoutes);

module.exports = router;
