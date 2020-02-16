const router = require("express").Router();

router.use("/", require("./index"));
router.use("/postLocation", require("./postLocation"));
router.use("/getLocation", require("./getLocation"));
router.use("/Euse-Weg", require("./ourRoute"));

module.exports = router;
