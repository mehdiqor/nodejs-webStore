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
/**
 * @swagger
 *  /user/refreshToken:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token for get new token and refresh token
 *          description: fresh token
 *          parameters:
 *              -   in: body
 *                  required: true
 *                  type: stirng
 *                  name: refreshToken
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post('/refreshToken', UserAuthController.refreshToken);

module.exports = {
    UserAuthRoutes : router
}

// "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTk1NDEzNTEwIiwiaWF0IjoxNjcwMzMzMjU0LCJleHAiOjE3MDE4OTA4NTR9.bAcLptUtATzv9hQV2okfnpxC4afBXm3OsjOmkGeMgss"
