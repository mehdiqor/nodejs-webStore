const router = require("express").Router();
const prisma = (new (require("@prisma/client")).PrismaClient());

/**
 * @swagger
 *  /blog/list:
 *      get:
 *          summary: get list of blogs with postgresSQL and prisma
 *          responses:
 *              200:
 *                  description: success
 */

router.get("/list", async(req, res, next) => {
    try {
        const a = b;
    } catch (error) {
        next(error)
    }
})