const path = require("path");
const { createBlogsSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/fuctions");

class BlogController extends Controller {
    async createBlog(req, res, next){
        try {
            const blogDataBody = await createBlogsSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename);
            req.body.image = req.body.image.replace(/\\/g, "/");
            const {title, text, short_text, tags, category} = blogDataBody;
            const image = req.body.image;
            const author = req.user._id;
            const blog = await BlogModel.create({title, text, short_text, tags, category, image, author});
            return res.status(201).json({
                data : {
                    statusCode: 201,
                    message : "ایجاد بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(image);
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
            const blogs = await BlogModel.aggregate([
                {
                    $match : {}
                },
                {
                    $lookup : {
                        from : "users",
                        foreignField : "_id",
                        localField : "author",
                        as : "author"
                    }
                },
                {
                    $unwind : "$author"
                },
                {
                    $lookup : {
                        from : "categories",
                        foreignField : "_id",
                        localField : "category",
                        as : "category"
                    }
                },
                {
                    $unwind : "$category"
                },                
                {
                    $project : {
                        "category.__v" : 0,
                        "author.__v" : 0,
                        "author.otp" : 0,
                        "author.Roles" : 0,
                        "author.discount" : 0,
                        "author.bills" : 0,
                    }
                }
            ])
            return res.status(200).json({
                data : {
                    statusCode : 200,
                    blogs
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