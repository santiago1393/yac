
"use strict";

var express = require("express");
var userController = require("../controllers/user");

const loginRoutes = express.Router();

loginRoutes.post('', async function(req, res){
    const user_nickname = req.body.nickname;
    try {
        userController.validate_user(user_nickname).then(result => {
            if(result){
                res.status(200).send({"result": "Usuario OK"});
            } else {
                res.status(401).send({"error": "Usuario invalido"});       
            }
        }).catch( err => {
            res.status(500).send({"error": JSON.stringify(err)});
        })        
    } catch (err) {
        res.status(500).send({"error": JSON.stringify(err)});
    }
});

module.exports = loginRoutes;