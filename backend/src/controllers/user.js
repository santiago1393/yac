
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

module.exports = {
    validate_user, createUser
};