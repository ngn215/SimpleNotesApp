// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    //wrapper to get root directory
    global._addRootPath = function(path) {
      return (__dirname + '/' + path);
    }

    //wrapper to perform require from in root directory
    global._rootRequire = function(path) {
      return require(_addRootPath(path));
    }

    var mongoOperations = _rootRequire('/app/assets/javascript/MongoOperations.js'); //get reference to mongoOperations
    var mongoose = mongoOperations.IntializeMongoose(); //intialize mongoose
    mongoOperations.ConnectToMongoDB(mongoose); //connect to db
    var mongooseModel = mongoOperations.CreateMongoModel(mongoose); //create model

    //RESTService
    _rootRequire('/app/assets/javascript/RESTService.js')(app, mongooseModel);


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
