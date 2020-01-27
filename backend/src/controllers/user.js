
const userModel = require("../models/user");

export function createUser(nickname){
    userModel.findOne({nickname: nickname}, (err, res) => {
        if( res ){
            console.log("User Exists");
            return false;            
        } else if ( err) {
            console.log(err);
            throw err;          
        } else {
            var new_user = userModel();
            new_user.nickname = nickname;
            new_user.save((err, res) => {
                if ( res) {
                    return  true;
                } else if( err) {
                    console.log(e);                    
                    throw(err);
                } else {
                    return false;
                }
            })
        }
    });
}

export function validate_user(nickname){
    userModel.findOne({nickname: nickname}, (err, res) => {
        if( res ){
            return true;            
        } else if ( err) {
            console.log(err);
            throw err;          
        } else {
            return false;
        }
    });
}