var db = require('./models');

var droneList = [
  {
    name: 'Zippy',
    size: 220,
    material: 'polycarbonate',
    propSize: 5,
    isCute: true,
    canFly: true,
    breaksEasy: false
  },
  {
    name: 'Alien',
    size: 220,
    material: 'carbon fiber',
    propSize: 5,
    isCute: true,
    canFly: true,
    breaksEasy: false
  },
  {
    name: 'Chameleon',
    size: 220,
    material: 'carbon fiber',
    propSize: 5,
    isCute: true,
    canFly: true,
    breaksEasy: false
  }
];

db.Drone.remove({}, function(err, removedEverything){
  if(err){return console.log("ERR: ", err);}

  db.Drone.create(droneList, function(err, lottaDrones){
    if(err){return console.log("ERR: ", err);}
    console.log(lottaDrones);
    process.exit(1);
  });

});
