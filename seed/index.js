import config from 'config';
import path from 'path';
import seeder from 'mongoose-seed';

import adminData from './admin.json';

const dbPath = `mongodb://${config.database.mongodb.host}:${config.database.mongodb.port}/${config.database.mongodb.name}`;

seeder.connect(dbPath, { useNewUrlParser: true, useCreateIndex: true }, () => {
    seeder.loadModels([
        path.join(__dirname, '../models/Administrator'),
    ]);

    seeder.clearModels(['Administrator'], () => {
        try {
            seeder.populateModels(adminData, (err) => {
                console.log('Seeded successfully');

                process.exit()
            });
        } catch (ex) {
            console.error(`Error occurred on ${ex.seed}`, ex.error);
            process.exit();
        }
    });
});
