import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import { connect } from './config'
const produce = require('../src/producer');
const config = require('./config');
const rawdata = require('./sample.json');
const sampleData = JSON.stringify(rawdata);


const app = express();
connect();

const port = process.env.PORT || 2340;

//morgan for logging
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/**
 * Send emails out to users
 * using service like sendgrid
 * which has to be configured
 */
produce(config.rabbit.queue, sampleData, durable = false);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
