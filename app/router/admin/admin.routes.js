const { BlogAdminApiRoutes } = require('./blog');
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
 *          description: list of categories
 *      -   name: Blog
 *          description: blog managment panel
 */

router.use("/category", CategoryRoutes)
router.use("/blogs", BlogAdminApiRoutes)

module.exports = {
    AdminRoutes : router
}