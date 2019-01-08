'use strict';

const passport = require('passport');
const passportJtw = require('passport-jwt');
const constants = require('../constants');

module.exports = {
    init() {
        const JwtStrategy = passportJtw.Strategy;
        const ExtractJWT = passportJtw.ExtractJwt;
        const { secrets: { jwt_login_auth: jwtLoginAuthSecret }} = constants;

        // JWT strategy
        passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtLoginAuthSecret
        }, (jwtPayload, done) => {
            return done(null, jwtPayload)
        }));

        // Local strategy

    }
};
