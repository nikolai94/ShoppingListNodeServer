var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

var facade = require("../model/facade");


/*
To do's
 -createUser
 -addAUserToList
 -createList
 //-check if user is available
 */

///-----------------------GET--------------------
router.get('/findUser/:username', function(req, res) {
    var username =  req.params.username;
     facade.findUser(username,function(err,result){
         if(err){
             res.status(err.status || 400);
             res.end(JSON.stringify({error: err.toString(),errorCode:1}));
             return;
         }

         if(result == null){
             res.end(JSON.stringify({error: "Could not find user",errorCode:2}));
             return;
         }
         res.send(JSON.stringify(result));
     });
});



    router.get('/findAllListOnUser/:username', function(req, res) {
        var username =  req.params.username;

        facade.findAllListOnUser(username, function(err,result){
            if(err){
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString(),errorCode:1}));
                return;
            }

            res.send(JSON.stringify(result));
        });
    });


router.get('/findOneListOnUser/:listTitle/:username', function(req, res) {

    var username =  req.params.username;
    var listTitle =  req.params.listTitle;

    facade.findOneListOnUsername(listTitle,username, function(err,result){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString(),errorCode:1}));
            return;
        }

        res.send(JSON.stringify(result));
    });

});


//-----------------POST----------------
router.post('/createUser', function(req, res, next) {
    var user = req.body;
    console.log(user);
    facade.createUser(user,function(err,result){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.send(JSON.stringify(result));
    });
});

router.post('/createList', function(req, res, next) {
    var List = req.body;
    facade.createList(List,function(err,result){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.send(JSON.stringify(List));
    });
});


router.post('/addItemToList/:listTitle/:listUsername', function(req, res, next) {
    var listTitle =  req.params.listTitle;
    var listUsername =  req.params.listUsername;
    var item = req.body;
    facade.addItemToList(listTitle,listUsername,item,function(err,result){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.send(JSON.stringify(result));
    });
});






///-----------------PUT--------------------------

router.put('/addAUserToList/:toTitle/:addToUsernameList/:newUsername', function (req, res) {
    var toTitle = req.params.toTitle;
    var addToUsernameList = req.params.addToUsernameList;
    var newUsername = req.params.newUsername;
   facade.addAUserToList(toTitle,addToUsernameList,newUsername,function(err,result){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.send(JSON.stringify(result));
    });

});

//------------------------DELETE-------------------------------

router.delete('/deleteItemInList/:fromTitle/:fromUsername/:itemTitle', function (req, res) {
    var fromTitle = req.params.fromTitle;
    var fromUsername = req.params.fromUsername;
    var itemTitle = req.params.itemTitle;
    facade.deleteItemInList(fromTitle,fromUsername,itemTitle,function(err,result){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.send(JSON.stringify(result));
    });
});



router.delete('/deleteItem/:listTitle/:listUsername', function (req, res) {
    var listTitle = req.params.listTitle;
    var listUsername = req.params.listUsername;

    facade.deleteList(listTitle,listUsername,function(err,result){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.send(JSON.stringify(result));
    });
});



router.delete('/deleteUserInList/:listUsername/:title', function (req, res) {
    var listUsername = req.params.listUsername;
    var title = req.params.title;

    facade.deleteUserInList(title,listUsername,function(err,result){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.send(JSON.stringify(result));
    });
});





module.exports = router;
