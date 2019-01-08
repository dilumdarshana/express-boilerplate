'use strict';

import redis from 'redis';
import config from 'config';

module.exports = () => {
    return async (req, res, next) => {

        const redisClient = await redis.createClient(config.cache.redis.port, config.cache.redis.host);

        redisClient.on('error', err => {
            console.log('#### Redis connection error ####', err);
        });

        redisClient.on('connect', () => {
            req.redis = redisClient;
            next();
        });
    }
};
