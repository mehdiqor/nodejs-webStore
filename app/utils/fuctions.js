const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { UserModel } = require('../models/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./costans');
const redisClient = require('./init_redis');
const fs = require('fs');
const path = require("path");

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
            expiresIn : "24h"
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
        jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
            if(err) reject(createError.InternalServerError("خطای سرور!"));
            // await redisClient.set(userId, token, 'EX', 60 * 60 * 24 * 365); DEBUG THIS!!!
            resolve(token)
        })
    })
}
function verifyRefreshToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) reject(createError.Unauthorized('!وارد حساب کاربری خود شوید'));
            const {phone} = payload || {};
            const user = await UserModel.findOne({phone}, {password : 0, otp : 0});
            if(!user) reject(createError.Unauthorized('حساب کاربری یافت نشد'));
            const refreshToken = redisClient.get(user?._id || "key_default");
            if(!refreshToken) reject(createError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد'));
            console.log(refreshToken);
            if(token === refreshToken) return resolve(phone);
            reject(createError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد'));
        })
    })
}
function deleteFileInPublic(fileAddress){
    if(fileAddress){
        const pathFile = path.join(__dirname, "..", "..", "public", fileAddress)
        if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
    }
}

module.exports = {
    randomNumberGenerator,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    deleteFileInPublic
}