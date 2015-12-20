var mongoose = require( 'mongoose' );
require('mongo-relation');

/*

Note:
To this test project as it is:

Start your MongoDB database.
Start mongo.exe and do:
  use testdb
  db.testusers.insert({userName : "Lars", email :"lam@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Henrik", email :"hsty@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Tobias", email :"tog@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Anders", email :"aka@cphbusiness.dk",pw: "test",created : new Date()})

*/
var dbURI;

//This is set by the backend tests
if( typeof global.TEST_DATABASE != "undefined" ) {
  dbURI = global.TEST_DATABASE;
}
else{
   dbURI = 'mongodb://localhost/androidServer';
   // dbURI = 'mongodb://root:hest1234@ds033145.mongolab.com:33145/android';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  global.mongo_error = "Not Connected to the Database";
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});


/** User SCHEMA **/
/** Replace this Schema with your own(s) **/
/*var usersSchema = new mongoose.Schema({
  userName : String,
  email: {type: String, unique: true},
  pw: String,
  created: { type: Date, default: new Date() }
});

mongoose.model( 'User', usersSchema,"testusers" );

*/


// UserSchema stores an Array of ObjectIds for posts
/*var ListSchema = new mongoose.Schema({
    name:String,
    list:[{item:String,size:Number}],
    users: [mongoose.Schema.ObjectId]
});

// PostSchema stores an ObjectId for the author
var UserSchema = new mongoose.Schema({
    username  : String,
    user_id : mongoose.Schema.ObjectId,
    password : String

});

// Attach the plugin
ListSchema.hasMany('User');
UserSchema.belongsTo('List', {through: 'user_id'});

var List = mongoose.model('List', ListSchema)
    , User = mongoose.model('User', UserSchema);
*/


//NEW
/*
var UserSchema = new mongoose.Schema({
    _id     : Number,
    username:String,
    password : String
});

// PostSchema stores an ObjectId for the author
var ListSchema = new mongoose.Schema({
    _id : Number,
    users: [{type: mongoose.Schema.ObjectId, ref: 'User' }],
    title  : String,
    list:[{item:String,size:Number}]
});

// Attach the plugin
//UserSchema.hasMany('List');
//ListSchema.belongsTo('User', {through: 'listId'});

var User = mongoose.model('User', UserSchema)
    , List = mongoose.model('List', ListSchema);
 */


var UserSchema = new mongoose.Schema({
    _id     : Number,
    username:{
        type:String,
        unique: true
    },
    password : String
});

// PostSchema stores an ObjectId for the author
var ListSchema = new mongoose.Schema({
    _id : Number,
    users: [{username:String}],
    title  : String,
    list:[{_id:Number,item:String,size:Number}]
});


var User = mongoose.model('User', UserSchema)
    , List = mongoose.model('List', ListSchema);


