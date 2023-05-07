const validateConfig = require('./config-validator');
const {
  getTransactionId,
  upload,
  uploadContact,
  sendEmail,
  sendCCEmail,
} = require('./helpers');
const { sign, verify } = require('./jwt');
const normalizePort = require('./normalize-port');
const { validateEmptyReqBody } = require('./validateEmptyReqBody');
const axios = require('./axios-wrapper');

global.axios = axios;

module.exports = {
  validateConfig,
  normalizePort,
  validateEmptyReqBody,
  sign,
  verify,
  getTransactionId,
  upload,
  uploadContact,
  sendEmail,
  sendCCEmail,
  axios,
};
