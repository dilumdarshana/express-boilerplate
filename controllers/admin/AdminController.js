import passport from 'passport';
import Router from '../../core/Router';
import Authorize from '../../middlewares/Authorization';

class AdminController extends Router {
    get routes() {
        return [
            ['GET', '/admin/profile', 'profile'],
        ];
    }

    get middleware() {
        return [
            passport.authenticate('jwt', { session: false }),
            Authorize('admin'),
        ];
    }

    async profile(req, res) {
        return res.json('Admin Profile....');
    }
}

module.exports = AdminController;
