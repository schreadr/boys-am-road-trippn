const mongoose = require("mongoose");
const Location = require("./location.model");

mongoose.set("useFindAndModify", false);

 //mongodb://127.0.0.1:27017/gruebler-am-road-trippn
mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useCreateIndex: true },
    () => console.log("connected")
);

module.exports.Location = Location;
