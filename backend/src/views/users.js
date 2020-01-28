
"use strict";

var express = require("express");
var userController = require("../controllers/user");

const userRoutes = express.Router();

userRoutes.post('', async function(req, res){    
    try {
        const user_nickname = req.body.nickname;         
        userController.createUser(user_nickname).then(result => {
            if(result){
                res.status(201).send({"result": "Usuario creado"});
            } else {
                res.status(409).send({"result": "El usuario ya existe"});
            }   
        }).catch( err => {
            console.log(err);            
            res.status(500).send({"error": JSON.stringify(err)});
        });     
    } catch ( err ) {
        console.log(err);        
        res.status(500).send({"error": JSON.stringify(err)});
    }
});

module.exports = userRoutes;
