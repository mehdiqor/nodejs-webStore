const { userAuthRoutes } = require('../http/validators/user/auth');
const { homeRoutes } = require('./api');
const router = require('express').Router();

router.use('/user', userAuthRoutes);
router.use('/', homeRoutes);

module.exports = {
    Allroutes : router
}