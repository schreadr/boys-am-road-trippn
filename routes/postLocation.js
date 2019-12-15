const postLocationRouter = require("express").Router();
const { Location } = require("../mongoose/mongoose");
const verifyAuthentification = require("../middleware/verifyAuthentication");
const path = require('path');

postLocationRouter.get("/", async (req, res) => {
  try {
    res.header({ 'Content-Type': 'text/html' });
    res.status(200).sendFile(path.join(process.cwd(), '/public/view/html/postLocation.html'));
  } catch (error) {
    return res.status(500).send("öpis isch nid gange");
  }
});

postLocationRouter.post("/", verifyAuthentification, async (req, res) => {
  const location = new Location({
    time: req.body.location.time,
    latitude: req.body.location.latitude,
    longitude: req.body.location.longitude
  });

  try {
    await location.save();
    return res.status(200).send(location);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = postLocationRouter;
