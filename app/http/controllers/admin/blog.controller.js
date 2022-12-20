const { createBlogsSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");

class BlogController extends Controller {
    async createBlog(req, res, next){
        try {
            const blogDataBody = await createBlogsSchema.validateAsync(req.body);
            return res.json(blogDataBody)
        } catch (error) {
            next(error)
        }
    }
    async getOneBlogByID(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlogs(req, res, next){
        try {
            return res.status(200).json({
                statusCode : 200,
                data : {
                    blogs : []
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCommentsOfBlog(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async deleteBlogByID(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async UpdateBlogByID(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AdminBlogController : new BlogController
}