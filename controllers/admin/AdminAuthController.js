import expressJoi from 'express-joi-validator';
import passport from 'passport';

import Router from '../../core/Router';

class AdminAuthController extends Router {
    get routes() {
        return [
            ['POST', '/admin/login', 'login'],
            ['GET', '/admin/logout', 'logout'],
        ];
    }

    async login(req, res) {
        const { email, password } = req.body;

        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('err', err)  
            res.json(user)
        });

        
    }

    async logout(req, res) {

    }
}

module.exports = AdminAuthController;
