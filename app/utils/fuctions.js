const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { UserModel } = require('../models/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./costans');

function OTPmaker(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function randomNumberGenerator(){
    return Math.floor((Math.random() * 90000) + 10000)
}
function signAccessToken(userId){
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            phone : user.phone
        };
        const options = {
            expiresIn : "1y"
        };
        jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if(err) reject(createError.InternalServerError("خطای سرور!"));
            resolve(token)
        })
    })
}
function signRefreshToken(userId){
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            phone : user.phone
        };
        const options = {
            expiresIn : "1y"
        };
        jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
            if(err) reject(createError.InternalServerError("خطای سرور!"));
            resolve(token)
        })
    })
}
function verifyRefreshToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) reject(createError.Unauthorized('وارد حساب کاربری خود شوید'));
            const {phone} = payload;
            const user = await UserModel.findOne({phone}, {password : 0, otp : 0});
            if(!user) reject(createError.Unauthorized('حساب کاربری یافت نشد'));
            resolve(phone)
        })
    })
}

module.exports = {
    randomNumberGenerator,
    OTPmaker,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
}