
const messageModel = require("../models/message");

export function get_messages(){
    messageModel.find({}, (err, res) => {
        if( res ){
            return res;            
        } else if ( err) {
            console.log(err);
            return false;            
        } else {
            return false;
        }
    });
}

export function get_last_message(){
    messageModel.findOne({}, {}, { sort: {'date': -1}}, (err, res) => {
        if( err){
            console.log(err);            
            return false;
        } else if(res){
            return res;
        } else {
            return false;
        }
    })
}

export function post_message(user, message_text){
    var message = messageModel();
    message.user = user;
    message.message = message_text;
    message.date = new Date();
    message.save((err, res) => {
        if( err){
            console.log(err);
            throw err;          
        } else if ( res){
            return true;
        } else {
            return false;
        }
    })

}