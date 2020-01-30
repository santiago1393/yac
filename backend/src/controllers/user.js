
const userModel = require("../models/user");

async function createUser(nickname){
    return new Promise((resolve, reject) => {        
        userModel.findOne({nickname: nickname}, (err, res) => {
            if( res ){
                resolve(false);
            } else if ( err) {
                reject(err);
            } else {
                var new_user = userModel();
                new_user.nickname = nickname;           
                new_user.save((err, res) => {
                    if ( res) {
                        resolve(true);
                    } else if( err) {
                        reject(err);
                    } else {
                        resolve(false);
                    }
                });
            }
        });
    });
}

async function validate_user(nickname){
    return new Promise((resolve, reject) => {
        userModel.findOne({nickname: nickname}, (err, res) => {
            if( res ){
                resolve(true);
            } else if ( err) {
                reject(err);
            } else {
                resolve(false);
            }
        });
    });
}

async function set_user_socket(nickname, socket_id){
    return new Promise((resolve, reject) => {
        userModel.updateOne({nickname: nickname}, {socket: socket_id}, (err, res) => {
            if( res){
                resolve(true);
            } else if ( err ){
                reject(err);
            } else {
                resolve(false);
            }
        });
    });
}

module.exports = {
    validate_user, createUser, set_user_socket
};