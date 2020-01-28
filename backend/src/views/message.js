
"use strict";

var express = require("express");
var messageController = require("../controllers/message");

const messageRoute = express.Router();

messageRoute.post('', async function(req, res){    
    try {
        const user = req.body.user;
        const mss = req.body.message;
        messageController.post_message(user, mss).then((result) => {
            if(result){
                res.status(200).send({"result": "Mensaje creado"});
            }else{
                res.status(500).send({"result": "Error interno al postear el mensaje"});
            }
        }).catch(err => {
            res.status(500).send({"error": JSON.stringify(err)});
        });
    } catch (err) {
        res.status(500).send({"error": JSON.stringify(err)});
    }
});

messageRoute.get('/all', async function(req, res){
    try {
        messageController.get_messages().then((result) => {
            if(result){
                res.status(200).send(result);
            } else {
                res.status(500).send({"result": "Error interno al obtener los mensajes"});
            }
        }).catch( err => {
            res.status(500).send({"error": JSON.stringify(err)})
        });
    } catch (err) {
        res.status(500).send({"error": JSON.stringify(err)})
    }

});

messageRoute.get('/last', async function(req, res){
    try{
        messageController.get_last_message().then((result) => {
            console.log(result);            
            if(result){
                res.status(200).send(result);
            } else {
                res.status(500).send({"result": "Error al recuperar los datos"});
            }
        }).catch( err => {
            res.status(500).send({"error": JSON.stringify(err)});
        })
    } catch ( err) {
        res.status(500).send({"error": JSON.stringify(err)});
    }
});



module.exports = messageRoute;