const createError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const { addCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");

class CategoryController extends Controller {
    async addCategory(req, res, next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title, parent} = req.body;
            const category = await CategoryModel.create({title, parent});
            if(!category) throw createError.InternalServerError('خطای داخلی!');
            return res.status(201).json({
                data : {
                    statusCode : 201,
                    message : "دسته بندی با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    removeCategory(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    editCategory(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getAllCategory(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getCategoryByID(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getAllParents(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getChildOfParents(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CategoryController : new CategoryController
}