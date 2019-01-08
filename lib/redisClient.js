'use strict';

import redis from 'redis';
import config from 'config';

module.exports = {
    redisClient: null,

    init() {
        this.redisClient = redis.createClient(config.cache.redis.port, config.cache.redis.host);

        this.redisClient.on('connect', () => {
            console.log('**** Connected to Redis ****');
        });

        this.redisClient.on('error', err => {
            console.log('#### Redis connection error ####', err);
        });
    },

    getRedisClient() {
        return this.redisClient;
    },
};
