require("./db");
var mongoose = require('mongoose');
var user = mongoose.model('User');
var list = mongoose.model('List');


//To do's
/*
-add item to list

(//-get all user's on list - (user array, make array with user all info from user))
//-get all list's from a user - (make a search in all list's where you search after THE username from the user array)
*/

function createUser(newUser,callback){
    user.create(newUser,function(err, user1){
        if(err) {return callback(err);}
         return callback(null,user1);
    });
}

function findUser(findUsername,callback){
    user.findOne({username:findUsername},function(err,data){
        if(err){return callback(err);}
        return callback(null,data);
    });
}

function deleteUserInList(title,findUsername,callback){
   /* user.remove({username:findUsername},function(err,data){
        if(err){return callback(err);}
        return callback(null,data);
    });
*/

    list.update(
     { "title": title,"users.username": findUsername },
     { $pull: { "users": { "username": findUsername } } },function(err,data){
     if(err){return callback(err);}
     return callback(null,data);
     });




}


function addAUserToList(toTitle,addToUsernameList,newUsername,callback){
    list.update({ "title": toTitle,"users.username": addToUsernameList},{ $push:{ users:  {username:newUsername} }}, function (err, result) {
        if(err){return callback(err);}
        return callback(null,result);
    })
}


function createList(newList,callback){
    list.create(newList,function(err, list1){
        if(err) {return callback(err);}
        return callback(null,list1);
    });
}


function findAllListOnUser(searchUsername,callback){
    list.find({"users.username": searchUsername},function (err, data) {
        if (err) {return callback(err);}

        return callback(null, data);
    });
}

function deleteItemInList(fromTitle,fromUsername,itemTitle,callback){
    /*list.update(
        { "title": fromTitle,"users.username": fromUsername },
        { $pull: { "list": { "item": itemTitle } } },function(err,data){
           if(err){return callback(err);}
            return callback(null,data);
        });
        */
    list.update(
        { "title": fromTitle,"users.username": fromUsername,"list.item": itemTitle },{$set: { "list.0.status": false }},function(err,data){
            if(err){return callback(err);}
            return callback(null,data);
        });
}

function deleteList(listTitle,listUsername, callback){
      /*list.remove({ "title": listTitle,"users.username": listUsername}, function(err,data) {
        if (err) {return callback(err);}
          callback(null,data);
    });*/
    list.update({ "title": listTitle,"users.username": listUsername}, {$set: { "status": false }},{upsert: true}, function (err, result) {
        if(err){return callback(err);}
        return callback(null,result);
    });

}

function addItemToList(listTitle,listUsername,newList,callback){
    list.update({ "title": listTitle,"users.username": listUsername},{ $push:{ list: newList}}, function (err, result) {
        if(err){return callback(err);}
        return callback(null,result);
    })
}

function findOneListOnUsername(listTitle,username,callback){
    list.findOne({"users.username":username,"title":listTitle},function(err,data){
        if(err){return callback(err);}
        return callback(null,data);
    });
}

module.exports = {
    createUser : createUser,
    findUser : findUser,
    addAUserToList : addAUserToList,
    createList : createList,
    findAllListOnUser:findAllListOnUser,
    deleteItemInList: deleteItemInList,
    deleteList:deleteList,
    addItemToList:addItemToList,
    findOneListOnUsername:findOneListOnUsername,
    deleteUserInList : deleteUserInList

}