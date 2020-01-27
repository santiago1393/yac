
"use strict";

var express = require("express");
var userController = require("../controllers/user");

const userRoutes = express.Router();

userRoutes.post('/user', function(req, res){
    const user_nickname = req.params.nickname;
    try {
        if(userController.createUser(user_nickname)){
            res.status(201).send({"result": "Usuario creado"});
        }else{
            res.status(409).send({"result": "El usuario ya existe"});
        }        
    } catch (error) {
        res.status(500).send({"error": JSON.stringify(error)});
    }
});
