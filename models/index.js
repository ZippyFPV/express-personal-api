var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Drone= require ("./droneModel")
// module.exports.Campsite = require("./campsite.js.example");
