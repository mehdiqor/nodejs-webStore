const { CategoryController } = require('../../http/controllers/admin/category.controller');
const router = require('express').Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Create-Update-Remove]
 *          summary: create new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add", CategoryController.addCategory);
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [GET-methods]
 *          summary: get all children of parents category
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/parents", CategoryController.getAllParents)
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [GET-methods]
 *          summary: get all parents of category or category head
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/children/:parent", CategoryController.getChildOfParents)
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [GET-methods]
 *          summary: get all categories
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/all", CategoryController.getAllCategory)
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Create-Update-Remove]
 *          summary: remove category with ObjectID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/remove/:id", CategoryController.removeCategory)
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [GET-methods]
 *          summary: get all ctegories without populate and nested structure
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate)
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [GET-methods]
 *          summary: find category with ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", CategoryController.getCategoryByID)
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Create-Update-Remove]
 *          summary: edit category title with ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: internal server error
 */
router.patch("/update/:id", CategoryController.editCategoryTitle)

module.exports = {
    CategoryRoutes : router
}