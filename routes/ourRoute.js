const getOurRouteRouter = require("express").Router();
const path = require('path');
const { Location } = require("../mongoose/mongoose");
const fs = require('fs');

getOurRouteRouter.get("/", async (req, res) => {
  try {
    const index = fs.readFileSync(
      path.join(process.cwd(), '/public/view/html/ourRoute.html'),
      { encoding: 'utf-8' }
    );

    //whole SERVER_DATA will be overridden
    const indexWithServerData = index.replace(
      '__SERVER_DATA__',
      JSON.stringify({
        TOMTOM_API_KEY: process.env.TOMTOM_API_KEY,
      })
    );

    res.header({ 'Content-Type': 'text/html' });
    res.status(200).send(indexWithServerData);
  } catch (error) {
    console.log("Error: " + error);
    return res.status(500).send("öpis isch nid gange");
  }
});

module.exports = getOurRouteRouter;
