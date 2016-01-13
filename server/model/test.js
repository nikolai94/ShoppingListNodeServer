require("./db");
var mongoose = require('mongoose');
var user = mongoose.model('User');
var list = mongoose.model('List');

var facade = require("./facade");


facade.deleteList("Jul","Tom",function(err,data){
    if(err){ console.log(err); return err; }
    console.log(data);
    return;
})