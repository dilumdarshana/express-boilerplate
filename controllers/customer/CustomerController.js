import passport from 'passport';
import Router from '../../core/Router';
import Authorize from '../../middlewares/Authorization';

class CustomerController extends Router {
    get routes() {
        return [
            ['GET', '/my-reservations', 'myReservations'],
            ['GET', '/profile', 'profile'],
        ];
    }

    get middleware() {
        return [
            passport.authenticate('jwt', { session: false }),
            Authorize('customer'),
        ];
    }

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    async myReservations(req, res) {
        return res.json('myReservations.....');
    }

    async profile(req, res) {
        return res.json('profile....');
    }
}

module.exports = CustomerController;
