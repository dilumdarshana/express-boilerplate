import cron from 'node-cron';
import sampleSchedule from './sampleSchedule';

module.exports = {
    init: () => {
        console.log('**** Schedules Initiated ****');

        // cron.schedule('* * * * *', () => {
        //     sampleSchedule.handle();
        // });
    },
};
