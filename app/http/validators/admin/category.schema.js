const joi = require('@hapi/joi');
const { mongoIdPattern } = require('../../../utils/costans');

const addCategorySchema = joi.object({
    title : joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    parent : joi.string().allow('').pattern(mongoIdPattern).allow('').error(new Error("شناسه واد شده صحیح نمیباشد"))
})
const updateCategorySchema = joi.object({
    title : joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد"))
})

module.exports = {
    addCategorySchema,
    updateCategorySchema
}