
const messageModel = require("../models/message");

async function get_messages(){
    return new Promise((resolve, reject) => {
        messageModel.find({}, {}, { sort: {'date': -1}}, (err, res) => {
            if( res ){
                resolve(res);
            } else if ( err) {
                reject(err);;            
            } else {
                resolve(false);
            }
        });
    });
}

async function get_last_message(){
    return new Promise((resolve, reject) => {
        messageModel.findOne({}, {}, { sort: {'date': 1}}, (err, res) => {
            if( err){
                reject(err);;
            } else if(res){
                resolve(res);
            } else {
                resolve(false);
            }
        });
    });
}

async function post_message(user, message_text){
    return new Promise((resolve, reject) => {
        var message = messageModel();
        message.user = user;
        message.message = message_text;
        message.date = new Date();
        message.save((err, res) => {
            if( err){
                reject(err);       
            } else if ( res){
                resolve(res);
            } else {
                resolve(false);
            }
        });
    });
}

module.exports = {
    post_message, get_last_message, get_messages
};