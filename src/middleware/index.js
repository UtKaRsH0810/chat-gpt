const makeExpressCallback = require('./express-callback');
const makeValidatorCallback = require('./validator-callback');
const errorHandler = require('./error-handler');
const badJsonHandler = require('./bad-json-handler');
const notFoundHandler = require('./not-found-error');
const rateLimiter = require('./rate-limiter').limiter;
const requestLog = require('./request-logger');
const { encryptData } = require('./encrypt');
const { decryptData } = require('./decrypt');
const adminLoggedIn = require('./admin-auth');
const userLoggedIn = require('./auth-handler');
const { pagination } = require('./pagination-handler');

module.exports = {
  makeExpressCallback,
  makeValidatorCallback,
  errorHandler,
  badJsonHandler,
  notFoundHandler,
  rateLimiter,
  requestLog,
  encryptData,
  decryptData,
  adminLoggedIn,
  userLoggedIn,
  pagination,
};
