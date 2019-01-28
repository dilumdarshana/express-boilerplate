import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import expressBoom from 'express-boom';
import cors from 'cors';

import mongodb from './lib/mongoDB';
import messenger from './lib/messenger';
import mailer from './lib/mailer';
import redisClient from './middlewares/RedisClient';

import schedules from './schedules';
import passportStrategies from './core/PassportStrategies';

// import routers
import Routes from './routes';

// create express app
const app = express();

app.use(cors({ origin: config.cors_urls }));

app.use(expressBoom());

app.use(redisClient());

// connect to mongodb
mongodb.init();

// connect to twilio
messenger.init();

// connect to sendgrid
mailer.init();

// scheduler init
schedules.init();

// passport stuffs
passportStrategies.init();

// inform that we are going to use body-parser
// urlencoded - this type of body will be convert
// extended - which need to allow rich data or simple data
app.use(bodyParser.urlencoded({
    extended: true,
}));
// body-parser use to convert http post data to json
app.use(bodyParser.json());

Routes(app);

// catch 404 and forwarding to error handler
app.use((req, res, next) => {
    res.boom.notFound();
    next();
});

// catch errors
app.use((error, req, res, next) => {
    if (error.isBoom) {
        const errorMessage = error.data.shift();
        res.boom.badData(errorMessage.message);
    } else {
        res.status(500).json({
            status: {
                message: 'Internal server error, Please contact Support.',
                code: 500,
            },
        });
        if (req.log) {
            req.log.error(error);
        } else {
            console.log(error);
        }
        res.end();
    }
});

// create server
const server = app.listen(config.port, () => {
    console.log(`**** Server listing to port: ${config.port} ****`);
});

module.exports = server;
