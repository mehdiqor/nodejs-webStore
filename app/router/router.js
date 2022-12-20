const { UserAuthRoutes } = require('./user/auth');
const { HomeRoutes } = require('./api');
const { AdminRoutes } = require('./admin/admin.routes');
const { DeveloperRoutes } = require('./admin/developer.routes');
const router = require('express').Router();

router.use('/user', UserAuthRoutes);
router.use('/admin', AdminRoutes);
router.use('/developer', DeveloperRoutes);
router.use('/', HomeRoutes);

module.exports = {
    Allroutes : router
}
