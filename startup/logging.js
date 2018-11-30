const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    // process.on('uncaughtException', (ex) => {
    //   winston.error(ex.message, ex);
    //   process.exit(1);
    // });

    // OR

    winston.handleExceptions(
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true
        }),
        new winston.transports.File({
            filename: 'uncaughtExceptions.log'
        })
    );

    process.on('unhandledRejection', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);

        // OR

        // throw ex; // winston.handleExceptions only works for uncaughtExceptions and doesn't work for unhandledRejections so, use this trick
    });

    winston.add(winston.transports.File, {
        filename: 'error.log',
        level: 'info'
    });
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly'
    });
}