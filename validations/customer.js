import joi from 'joi';

module.exports = {
    signUp: {
        body: {
            name: joi.string().required().label('Name'),
            phone: joi.string().required(),
            zip: joi.string().required()
        }
    },
};