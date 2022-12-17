const { userAuthRoutes } = require('./user/auth');
const { homeRoutes } = require('./api');
const redisClient = require('../utils/init_redis');
const router = require('express').Router();

(async() => {
    await redisClient.set('key', 'value')
    const value = await redisClient.get('key')
    console.log(value);
})()
router.use('/user', userAuthRoutes);
router.use('/', homeRoutes);

module.exports = {
    Allroutes : router
}