let fs = require('fs');

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const app = express();

require('express-async-errors');
const router = express.Router();
const router_v2 = express.Router();
require('../src/utils/api-errors');

require('dotenv').config();

const config = require('config');

require('../src/config/validate');

const { API_PREFIX, API_PREFIX_V2 } = config;
global.config = config;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());

const {
  errorHandler,
  badJsonHandler,
  requestLog,
} = require('../src/middleware');

const { routes, routes_v2 } = require('./loaders')(router, router_v2);

app.use(badJsonHandler);

const options = {
  swaggerOptions: {
    authAction: {
      JWT: {
        name: 'JWT',
        schema: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
        },
        value: 'Bearer <JWT>',
      },
    },
  },
};

app.use(requestLog);
app.use(API_PREFIX, routes);
app.use(API_PREFIX_V2, routes_v2);

app.use(errorHandler);

app.use('/get-logs', (req, res) => {
  const file = fs.readFileSync('./log.txt');
  res.send(file.toString('utf-8'));
});

app.use('/download-logs', (req, res) => {
  const file = fs.readFileSync('./log.txt');
  // res.send(file.toString('utf-8'))
  res.download('log.txt');
});
module.exports = app;
