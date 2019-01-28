const passport = require('passport');
const passportJtw = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const constants = require('../constants');

import { AdministratorModel } from '../models/Administrator';

module.exports = {
    init() {
        const JwtStrategy = passportJtw.Strategy;
        const ExtractJWT = passportJtw.ExtractJwt;
        const { secrets: { jwt_login_auth: jwtLoginAuthSecret } } = constants;

        // JWT strategy
        passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtLoginAuthSecret,
        }, (jwtPayload, done) => done(null, jwtPayload)));

        // Local strategy
        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
             function (email, password, done) {console.log('xxx')
                return AdministratorModel.findOne({ email },
                    'name email password_hash active')
                    .then(user => {
                        if (!user) {
                            return done('Username or password is incorrect. Try again');
                        }

                        // compare user entered password with hash
                        AdministratorModel.comparePassword(password, function (err, isMatch) {
                            if (err) {
                                return done('Internal server error.');
                            } else if (!isMatch) {
                                return done('Username or password is incorrect. Try again');
                            } else {
                                return done(null, user, { message: 'Logged In Successfully' });
                            }
                        });
                    })
                    .catch(err => done(err));
            }
        ));
    },
};
