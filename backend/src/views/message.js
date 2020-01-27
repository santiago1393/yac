
"use strict";

var express = require("express");
var messageController = require("../controllers/message");

const userRoutes = express.Router();

userRoutes.post('/message', function(req, res){
    const user = req.params.user;
    const mss = req.params.message;

    try {
        if(messageController.post_message(user, mss)){
            res.status(200).send({"result": "Mensaje creado"});
        }else{
            res.status(400).send({"result": "Error interno al postear el mensaje"});
        }        
    } catch (error) {
        res.status(500).send({"error": JSON.stringify(error)});
    }
});
