const createError = require('http-errors');
const { UserModel } = require('../../../../models/users');
const { EXPIRES_IN, USER_ROLE } = require('../../../../utils/costans');
const { randomNumberGenerator, signAccessToken } = require('../../../../utils/fuctions');
const { getOtpSchema, checkOtpSchema } = require('../../../validators/user/auth.schema');
const Controller = require('../../controller');

class UserAuthController extends Controller {
    async getOtp(req, res, next){
        try {
            await getOtpSchema.validateAsync(req.body);
            const {phone} = req.body;
            const code = randomNumberGenerator();
            const result = await this.saveUser(phone, code);
            if(!result) throw createError.Unauthorized("ورود شما انجام نشد")
            return res.status(200).send({
                data : {
                    statusCode : 200,
                    message: "کد اعتبارسنجی با موفقیت برای شما ارسال شد",
                    code,
                    phone
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkOtp(req, res, next){
        try {
            await checkOtpSchema.validateAsync(req.body);
            const {phone , code} = req.body;
            const user = await UserModel.findOne({ phone });
            if(!user) throw createError.NotFound("کاربر یافت نشد");
            if(user.otp.code != code) throw createError.Unauthorized("کد ارسال شده صحیح نمیباشد");
            const now = Date.now();
            if(user.otp.expiresIn < now) throw createError.Unauthorized("کد شما منقضی شده است");
            const accessToken = await signAccessToken(user._id)
            return res.json({
                data : {
                    accessToken
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async saveUser(phone, code){
        let otp = {
            code,
            expiresIn : EXPIRES_IN
        }
        const result = await this.checkExistUser(phone);
        if(result){
            return (await this.updateUser(phone, {otp}))
        }
        return !!(await UserModel.create({
            phone,
            otp,
            role : [USER_ROLE]
        }))
    }
    async checkExistUser(phone){
        const user = await UserModel.findOne({phone});
        return !! user
        //return true or false
    }
    async updateUser(phone, objectData = {}){
        Object.keys(objectData).forEach(key => {
            if(["", " ", "0", 0, null, undefined, NaN]) delete objectData[key];
        })
        const updateResult = await UserModel.updateOne({phone}, {$set : objectData});
        return !!updateResult.modifiedCount
    }
}

module.exports = {
    UserAuthController : new UserAuthController()
}