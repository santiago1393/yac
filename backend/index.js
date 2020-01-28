"use strict";

const dotenv = require("dotenv");
const mongoose = require("mongoose")
const express = require('express');
const cors = require("cors");
const body_parser = require("body-parser");

dotenv.config();

const port = process.env.PORT;
const mongo_host = process.env.MONGO_HOST;
const mongo_port = process.env.MONGO_PORT;
const mongo_user = process.env.MONGO_USER;
const mongo_pass = process.env.MONGO_PASS;
const mongo_db = process.env.MONGO_DB;

mongoose.connect(`mongodb://${mongo_user}:${mongo_pass}@${mongo_host}:${mongo_port}/${mongo_db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
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

const loginAPI = require("./src/views/login");
const messageAPI = require("./src/views/message");
const userAPI = require("./src/views/users");

app.use(
    cors({
      origin: "*",
      methods: "GET, POST, PUT, DELETE, OPTIONS,",
      allowedHeader: "Content-Type,Authorization",
      preflightContinue: false,
      optionsSuccessStatus: 200
    })
);

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
app.use('/auth', loginAPI);
app.use('/user', userAPI);
app.use('/message', messageAPI);



server.listen(port, function(){
    console.log(`Servidor running at ${port}`);    
});

io.on('connection', function(socket){
    console.log('New client');
    socket.emit('messages', messages); 
});


