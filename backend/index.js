"use strict";

const dotenv = require("dotenv");
const mongoose = require("mongoose")
const express = require('express');


dotenv.config();

const port = process.env.PORT;
const mongo_host = process.env.MONGO_HOST;
const mongo_port = process.env.MONGO_PORT;
const mongo_user = process.env.MONGO_USER;
const mongo_pass = process.env.MONGO_PASS;
const mongo_db = process.env.MONGO_DB;

mongoose.connect(`mongodb://${mongo_user}:${mongo_pass}@${mongo_host}:${mongo_port}/${mongo_db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true
  })
  .then(() => {
    console.log(`Mongo OK`);
  })
  .catch(err => {
    console.error(`Mongo FAIL: ${err}`);
    process.exit(1);
});

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(
    cors({
      origin: "*",
      methods: "GET, POST, PUT, DELETE, OPTIONS,",
      allowedHeader: "Content-Type,Authorization",
      preflightContinue: false,
      optionsSuccessStatus: 200
    })
);


server.listen(port, function(){
    console.log(`Servidor running at ${port}`);    
});

io.on('connection', function(socket){
    console.log('New client');
    socket.emit('messages', messages); 
});


