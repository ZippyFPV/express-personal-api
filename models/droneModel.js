var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// make a drone blueprint
var DroneSchema = new Schema({
  name: String,
  size: Number,
  material: String,
  propSize: Number,
  isCute: Boolean,
  canFly: Boolean,
  breaksEasy: Boolean
});

// make a new factory that uses the blueprint
var Drone = mongoose.model('Drone', DroneSchema);

module.exports = Drone;
