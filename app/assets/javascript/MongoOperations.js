console.log("inside MongoOperations");

//returns require('monngoose') reference
var IntializeMongoose =
function()
{
  var mongoose = require('mongoose');
  return mongoose;
}

//connects to mongoDB
var ConnectToMongoDB =
function(mongoose){
    //get database config file reference
    var databaseConfig = _rootRequire('config/database.js');

    //connect to mongoDB using mongoURL
    mongoose.connect(databaseConfig.mongoURL);     // connect to mongoDB database on modulus.io
}

//creates mongoDB model
var CreateMongoModel =
function(mongoose){
  var mongooseModel = mongoose.model('Todo', {
      text : String
  });

  return mongooseModel;
}

//exposes above functions
exports.IntializeMongoose = IntializeMongoose;
exports.ConnectToMongoDB = ConnectToMongoDB;
exports.CreateMongoModel = CreateMongoModel;
