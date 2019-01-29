import passport from 'passport';
import passportJtw from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import constants from '../constants';

import { AdministratorModel } from '../models';

module.exports = {
    init() {
        const { Strategy: JwtStrategy, ExtractJwt: ExtractJWT } = passportJtw;
        const { secrets: { jwt_login_auth: jwtLoginAuthSecret } } = constants;

        // JWT strategy
        passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtLoginAuthSecret,
        }, (jwtPayload, done) => done(null, jwtPayload)));

        // Local strategy
        passport.serializeUser((user, done) => {
            done(null, user.email);
        });

        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
            async (email, password, done) => {
                try {
                    const user = await AdministratorModel.findOne({ email });

                    if (!user) {
                        return done('Username or password is incorrect. Try again');
                    }
                    const { password: passwordDB } = user;
                    const match = await AdministratorModel.comparePassword(password, passwordDB);

                    if (!match.result) {
                        return done('Username or password is incorrect. Try again');
                    } else {
                        return done(null, user, { message: 'Logged In Successfully' });
                    }
                } catch(error) {
                    return done('Internal server error.');
                }
            }
        ));
    },
};
