const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');
const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 */
/**
 * @swagger
 *  /user/get-opt:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user userpanel with phonenumber
 *          description: one time password(OTP) login
 *          parameters:
 *          -   name: phone
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post('/get-opt', UserAuthController.getOtp);
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check-otp value in user controller 
 *          description: ckeck one time password(OTP)
 *          parameters:
 *          -   name: phone
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post('/check-otp', UserAuthController.checkOtp);

module.exports = {
    userAuthRoutes : router
}