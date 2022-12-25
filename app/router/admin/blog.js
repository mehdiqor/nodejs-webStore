const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middleware/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog]
 *          summary: get all blogs
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success - get array of blogs
 */
router.get("/", AdminBlogController.getListOfBlogs)
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          summary: get blog by ID and populate this fields
 *          tags: [Blog]
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", AdminBlogController.getOneBlogByID)
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog]
 *          summary: edit blog documents by ID
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foor_bar || str || undefind
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *          responses:
 *              201:
 *                  description: created
 */
router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.UpdateBlogByID)
/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog]
 *          summary: create blog document
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foor_bar || str || undefind
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required: true
 *                  type: file
 *          responses:
 *              201:
 *                  description: created
 */
router.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog)
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete:
 *          summary: delete blog by ID
 *          tags: [Blog]
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/:id", AdminBlogController.deleteBlogByID)

module.exports = {
    BlogAdminApiRoutes : router
}