
"use strict";

var express = require("express");
var userController = require("../controllers/user");

const loginRoutes = express.Router();

loginRoutes.post('/login', function(req, res){
    const user_nickname = req.params.nickname;
    try {
        if(userController.validate_user(user_nickname)){
            res.status(200).send({"result": "Usuario OK"});
        }else{
            res.status(404).send({"result": "El usuario no existe"});
        }        
    } catch (error) {
        res.status(500).send({"error": JSON.stringify(error)});
    }
});

module.exports = loginRoutes;