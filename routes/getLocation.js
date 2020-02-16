const getLocationRouter = require("express").Router();
const path = require('path');
const { Location } = require("../mongoose/mongoose");

getLocationRouter.get("/", async (req, res) => {
    try {
        const locations = await Location.find().sort({ "time": -1 });
        let jsonLocations = {};
        if (locations) {
            jsonLocations = locations.map(location => {
                return {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    time: location.time
                };
            });
        }
        res.header({ 'Content-Type': 'application/json' });
        res.status(200).json(jsonLocations);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).send("öpis isch nid gange");
    }
});

module.exports = getLocationRouter;