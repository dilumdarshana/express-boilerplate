'use strict';

import { hashSync, compareSync, genSaltSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import expressJoi from 'express-joi-validator';
import passport from 'passport';
import messenger from '../../lib/messenger';
import util from '../../helpers/util';
import constants from '../../constants';
import Router from '../../core/Router';
import validations from '../../validations';
import Authorize from '../../middlewares/Authorization';

import { CustomerModel } from '../../models';

class CustomerAuthController extends Router {

    get routes() {
        return [
            ['POST', '/signup', 'signUp', [expressJoi(validations.customer.signUp)]],
            ['POST', '/login', 'login'],
            ['GET', '/logout', 'logout', [passport.authenticate('jwt', {session: false}), Authorize()]],
            ['POST', '/verify', 'verify'],
        ];
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async signUp(req, res) {
        const { name, phone, zip } = req.body;

        try {
            const customerExists = await CustomerModel.findOne({ phone });

            if (customerExists) {
                return res.json({ status: false, message: 'Customer already exists' });
            }

            const customer = {
                name,
                phone,
                zip
            };
            const createdUser = await CustomerModel.create(customer);

            res.json(createdUser);
        } catch (error) {
            console.log('Error on: CustomerAuthController->signUp', error);
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async login(req, res) {
        const { phone } = req.body;

        try {
            const customer = await CustomerModel.findOne({ phone });

            // validations
            if (customer === null) {
                return res.json({ status: false, message: 'No customer found' });
            }

            // save verification has on DB
            const { _id: customerId } = customer;
            const pin = util.generatePinCode();
            const verificationHash = await hashSync(pin, genSaltSync(10), null);

            console.log('pin', pin);

            // send verification message to customer
            const message = {
                message: `Here is your PIN code: ${pin}`,
                phone
            };

            await Promise.all([
                CustomerModel.updateOne({ _id: customerId }, { verification_hash: verificationHash }),
                messenger.send(message)
            ]);

            res.json({ status: true, message: 'Verification code sent' });
        } catch (error) {
            console.log('Error on: CustomerAuthController->login', error)
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async verify(req, res) {
        const { phone, code } = req.body;

        const customer = await CustomerModel.findOne({ phone });

        // validations
        if (customer === null) {
            return res.json({ status: false, message: 'No customer found' });
        }

        const { _id: customerId, verification_hash: verificationHash, name } = customer;
        const { secrets: { jwt_login_auth: jwtLoginAuthSecret }} = constants;

        const compareResult = await compareSync(code, verificationHash);

        if (compareResult) {
            // generate user token
            const customerTokenInfo = {
                id: customerId,
                name,
                phone,
                user_type: 1
            };

            const token = jwt.sign(customerTokenInfo, jwtLoginAuthSecret, { expiresIn: '24h' });

            await req.redis.hmset(`table_user_${customerId}`, 'token', token, 'user_type', 1);

            // remove verification hash from db
            // -- TODO

            res.json({ status: true, message: 'Customer authenticated', token });
        } else {
            res.json({ status: false, message: 'Invalid verification code' });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async logout(req, res) {
        req.redis.del(`table_user_${req.user.id}`, (err, user) => {
            if (err) {
                req.log.error(error);
                res.boom.badImplementation('Can not delete cached user data');
            } else {
                return res.json({
                    status: true,
                    message: 'User successfully logged out'
                });
            }
        });
    }
}

module.exports = CustomerAuthController;
