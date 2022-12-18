const { CategoryRoutes } = require('./category');
const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin
 *      -   name: Create-Update-Remove
 *          description: CRUD
 *      -   name: GET-methods
 *      -   description: list of categories
 */

router.use("/category", CategoryRoutes)

module.exports = {
    AdminRoutes : router
}