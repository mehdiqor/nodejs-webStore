const path = require("path");
const { createBlogsSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/fuctions");
const createError = require("http-errors");

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await createBlogsSchema.validateAsync(req.body);
      req.body.image = path.join(
        blogDataBody.fileUploadPath,
        blogDataBody.filename
      );
      req.body.image = req.body.image.replace(/\\/g, "/");
      const { title, text, short_text, tags, category } = blogDataBody;
      const image = req.body.image;
      const author = req.user._id;
      const blog = await BlogModel.create({
        title,
        text,
        short_text,
        tags,
        category,
        image,
        author,
      });
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "ایجاد بلاگ با موفقیت انجام شد",
        },
      });
    } catch (error) {
      deleteFileInPublic(image);
      next(error);
    }
  }
  async getOneBlogByID(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog(id);
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      const blogs = await BlogModel.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            "category.__v": 0,
            "author.__v": 0,
            "author.otp": 0,
            "author.Roles": 0,
            "author.discount": 0,
            "author.bills": 0,
          },
        },
      ]);
      return res.status(200).json({
        data: {
          statusCode: 200,
          blogs,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCommentsOfBlog(req, res, next) {
    try {
        
    } catch (error) {
      next(error);
    }
  }
  async deleteBlogByID(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog(id);
      const result = await BlogModel.deleteOne({ _id: id });
      if (result.deletedCount == 0)
        throw createError.InternalServerError("حذف مقاله انجام نشد");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "حذف مقاله با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async UpdateBlogByID(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog(id);
      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
        req.body.image = req.body.image.replace(/\\/g, "/");
      }
      const data = req.body;
      let nullishData = ["", " ", "0", 0, null, undefined];
      let blackList = ["bookmark", "like", "dislike", "comment", "author"];
      Object.keys(data).forEach((key) => {
        if (blackList.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && Array.length > 0)
        data[key] = data[key].map((item) => item.trim());
        if (nullishData.includes(data[key])) delete data[key];
      });
      const updateResult = await BlogModel.updateOne({_id : id}, {$set : data});
      if(updateResult.modifiedCount == 0) throw createError.InternalServerError("بروزرسانی انجام نشد");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "بروزرسانی بلاگ با موفقیت انجام شد"
        },
      });
    } catch (error) {
      deleteFileInPublic(req?.body?.image);
      next(error);
    }
  }
  async findBlog(id) {
    const blog = await BlogModel.findById(id).populate([
      {
        path: "category",
        select: ["title"],
      },
      {
        path: "author",
        select: ["mobile", "first_name", "last_name", "username"],
      },
    ]);
    if (!blog) throw createError.NotFound("مقاله ای یافت نشد");
    delete blog.category.children;
    return blog;
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
