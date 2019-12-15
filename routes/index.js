const getRouter = require("express").Router();
const path = require('path');
const { Location } = require("../mongoose/mongoose");

getRouter.get("/",  async (req, res) => {
  try {
    const currentLocation = await Location.findOne().sort({"time": -1}).limit(1);
    res.header({ 'Content-Type': 'text/html'});
    res.status(200).send("<!DOCTYPE html><html><head><meta charset=\"utf-8\" /></head><body><p><a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://www.google.com/maps/search/?api=1&query="+currentLocation.latitude+","+currentLocation.longitude+"\">Da</a> simer am "+currentLocation.time.toISOString().replace(/T/, ' ').replace(/\..+/, '')+" gsi.</p></body></html>");
  } catch (error) {
    return res.status(500).send("öpis isch nid gange");
  }
});

module.exports = getRouter;
