'use strict';

import twilio from 'twilio';
import _async from 'async';
import config from 'config';

module.exports = {

    messageClient: null,

    init() {
        this.messageClient = twilio(config.twilio.account_sid, config.twilio.auth_token);
    },
    send(data) {
        return this.messageClient.messages.create({
            body: data.message,
            from: config.twilio.number,
            to: data.phone,
        });
    },
    sendToMany(phoneList, data) {
        return new Promise((resolve, reject) => {
            _async.each(phoneList, (subscriber, cb) => {
                this.messageClient.messages.create({
                    to: subscriber.phone,
                    from: config.twilio.number,
                    body: data.message
                }).then((message) => {
                    cb(message.sid);
                });
            }, err => {
                if (err) {
                    reject(err);
                } else {
                   resolve('success');
                }
            });
        });
    }
};
