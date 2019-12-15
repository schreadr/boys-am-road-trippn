const router = require("express").Router();

router.use("/", require("./index"));
router.use("/postLocation", require("./postLocation"));

module.exports = router;
