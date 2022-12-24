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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTkxNDI2OTE1IiwiaWF0IjoxNjcxODgxMTk2LCJleHAiOjE2NzE5Njc1OTZ9.84QXYI6vJkzsJ_rbn_e9kayz1Db_P6YM6815FAtlOaI
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
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog]
 *          summary: create blog document
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTkxNDE1NTg3IiwiaWF0IjoxNjcxODc1MTc1LCJleHAiOjE2NzE4Nzg3NzV9.s5_CstxM8PzrL7RJ1Wf1M9_bGZmc3luWM3KSeQhewII
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

module.exports = {
    BlogAdminApiRoutes : router
}