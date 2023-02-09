const express = require("express");
const router = express.Router();

const routesP = require("./propertiesRoutes");

router.use("/properties", routesP);

module.exports = router;
