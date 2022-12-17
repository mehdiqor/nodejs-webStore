const { UserAuthRoutes } = require('./user/auth');
const { HomeRoutes } = require('./api');
const { AdminRoutes } = require('./admin/admin.routes');
const { DeveloperRoutes } = require('./developer.routes');
const router = require('express').Router();

router.use('/user', UserAuthRoutes);
router.use('/developer', DeveloperRoutes);
router.use('/admin', AdminRoutes);
router.use('/', HomeRoutes);

module.exports = {
    Allroutes : router
}
