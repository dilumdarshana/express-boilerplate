'use strict';

import bunyan from 'bunyan';
import config from 'config';

const log = bunyan.createLogger({
    name: 'sample-scheduler',
    streams: [{ path: config.logs.cron }]
});

class SampleSchedule {
    static async handle() {
        console.log('Calling sample schedule...');
        log.error('error')
    }
}

module.exports = SampleSchedule;
