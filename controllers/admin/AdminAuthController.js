import expressJoi from 'express-joi-validator';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import constants from '../../constants';
import Router from '../../core/Router';
import validations from '../../validations';
import Authorize from '../../middlewares/Authorization';
import { AdministratorModel } from '../../models';

class AdminAuthController extends Router {
    get routes() {
        return [
            ['POST', '/admin/login', 'login', [expressJoi(validations.admin.login)]],
            ['GET', '/admin/logout', 'logout', [passport.authenticate('jwt', { session: false }), Authorize()]],
            ['POST', '/admin/new', 'new'],
        ];
    }

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    async login(req, res) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                res.boom.badRequest(JSON.stringify(err));
            } else {
                req.login(user, { session: false }, async (loginError) => {
                    const { secrets: { jwt_login_auth: jwtLoginAuthSecret }, user_types: { admin: userType } } = constants;
                    const { _id: userId, name } = user;
                    const tokenInfo = {
                        id: userId,
                        name,
                        user_type: userType,
                    };
                    const token = jwt.sign(tokenInfo, jwtLoginAuthSecret, { expiresIn: '24h' });

                    try {
                        await req.redis.hmset(`table_user_${userId}`, 'token', token, 'user_type', userType);
                    } catch (error) {
                        res.json({ status: false, message: error.message });
                    }

                    res.json({ status: true, message: 'Admin User authenticated', data: { token, user: { type: userType, name, id: userId } } });
                });
            }
        })(req, res);
    }

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    async logout(req, res) {
        req.redis.del(`table_user_${req.user.id}`, (err, user) => {
            if (err) {
                req.log.error(err);
                res.boom.badImplementation('Can not delete cached user data');
            } else {
                return res.json({
                    status: true,
                    message: 'Admin User successfully logged out',
                });
            }
        });
    }

    async new(req, res) {
        AdministratorModel.create({ name: 'apache', email: 'dilum.dar@gmail.com', password: '123' });
        res.json('done');
    }
}

module.exports = AdminAuthController;
