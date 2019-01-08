'use strict';

import _ from 'lodash';
import constants from '../constants';

const Authorization = (...accessRoles) => {
    return async (req, res, next) => {
        const { id, user_type: userType } = req.user;

        req.redis.hgetall(`table_user_${id}`, (err, cachedUser) => {
            if (err) {
                req.log.error(error);
                res.boom.badImplementation('Can not find cached user data');
            } else {
                if (cachedUser) {
                    if (accessRoles.length === 0) {
                        next();
                    } else {
                        const rolesArr = [];
                        
                        _.forIn(constants.user_types, (key, val) => {
                            if (_.indexOf(accessRoles, val) !== -1) {
                                rolesArr.push(key);
                            }
                        });

                        if (rolesArr.indexOf(userType) !== -1) {
                            next();
                        } else {
                            res.boom.forbidden('You are not authorized to access this API');
                        }
                    }
                } else {
                    res.boom.unauthorized('Unauthorized');
                }
            }
        });
    }
};


module.exports = Authorization;
