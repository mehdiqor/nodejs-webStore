const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    username : {type : String},
    mobile : {type : String},
    email : {type : String},
    password : {type : String},
    otp : {type : Object, default : {
        code : 0,
        expires : 0
    }},
    bills : {type : [Object], default : []},
    discount : {type : Number, default : 0},
    birthday : {type : String},
    role : {type : [String], default : "USER"}
});

module.exports = {
    UserModel : mongoose.model('User', Schema)
}