const homeController = require('../../http/controllers/api/home.controller');
const { verifyAccessToken } = require('../../http/middleware/verifyAccessToken');
const router = require('express').Router();
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: index page routes
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer yourToken...
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: notFound
 */

router.get('/', verifyAccessToken, homeController.indexPage);

module.exports = {
    homeRoutes : router
}