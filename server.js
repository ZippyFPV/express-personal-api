// require express and other modules
var express = require('express'),
    app = express();
var db = require('./models')

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
    baseUrl: "https://tranquil-shelf-39643.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/droneModel", description: "E.g. Get all drones"}, // CHANGE ME
      {method: "POST", path: "/api/droneModel", description: "E.g. Create a new drone"},
      {method: "DELETE", path: "/api/droneModel", description: "E.g. Delete a drone"},
      {method: "PUT", path: "/api/droneModel", description: "E.g. Update a drone"},
      {method: "GET", path: "/api/droneModel/:id", description: "E.g. Get one drone."}
    ]
  })
});

app.get('/api/profile', function getProfile (req, res){
  var profile = res.json({
      name: String,
      githubUserName: String,
      githubLink: String,
      githubProfileImage: String,
      personalSiteLink: String,
      currentCity: String,
      pets: [{name: "Sapphire", type: "Cat", breed: "American-Shorthair"}, {name: "Scout", type: "Cat", breed: "American-Shorthair"}]
  })
});


  // get all Drones
app.get('/api/droneModel', function(req, res) {
// find all todos in db
    db.Drone.find({}, function(err, allDrones) {
        res.json({ Drone: allDrones });
    });
});

// create new drone
app.post('/api/droneModel', function(req, res) {
    // create new drone with form data (`req.body`)
    var newDrone  = req.body;
    db.Drone.create(newDrone, function(err, createdDrone) {
    	if(err){return console.log(err)}
    	res.json(createdDrone);
    });
});

// delete drone
app.delete('/api/droneModel/:id', function(req, res) {
    // get drone id from url params (`req.params`)
    var droneId = req.params.id;

    // find drone in db by id and remove
    db.Drone.findOneAndRemove({ _id: droneId }, function(err, deletdDrone) {
        res.json(deletedDrone);
    });
});

// update todo
app.put('/api/droneModel/:id', function(req, res) {
    // get drone id from url params (`req.params`)
    var droneId = req.params.id;

    // create an updateTodo object from req.body
	var updateDrone = {
	  task: req.body.task,
      description: req.body.description
    }

    db.Drone.findOneAndUpdate({ _id: droneId }, updateDrone, { new: true}, function(err, updatedDrone){
      if(err){return console.log(err)}
	  res.json(updatedDrone);
    });
});

// get one drone
app.get('/api/droneModel/:id', function(req, res) {
    // get drone id from url params (`req.params`)
    var droneId = req.params.id;

    // find todo in db by id
    db.Drone.findOne({ _id: droneId }, function(err, foundDrone) {
       	if(err){return console.log(err)}
        res.json(foundDrone);
    });
});



/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
