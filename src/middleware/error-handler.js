// const db = require('sequelize');
const db = require('../db/models');
const { log, logToFile } = require('../support/logger');
// const { sendMessage } = require('../support/slackNotify');
const decryptData = require('./decrypt').decryptData;

module.exports = async (err, req, res, next) => {
  const errorData = {
    date: new Date(),
    env: process.env.NODE_ENV,
    level: 'error',
    error: err?.response?.data,
    //errorDescription: err,
    name: err.name,
    message: err.message,
    api: req.url,
    method: req.method,
    body: req.body,
    decryptedBody: req.body.encryptedData
      ? decryptData(req.body.encryptedData)
      : req.body,
    client: req.ip,
    customerId: req.customerId ? req.customerId : 'Customer not available!',
    // stack: err.stack,
  };

  console.log('---------------   errorData ---------------');
  console.log(errorData);

  if (req.url.split('/')[3] == 'waitlist') {
    return res.status(err.status || 500).send({
      success: false,
      type: 'error',
      message: err.message,
      data: {},
    });
  }

  const errorDataForSlack = {
    date: new Date(),
    env: process.env.NODE_ENV,
    level: 'error',
    error: err?.response?.data,
    errorDescription: err,
    name: err.name,
    message: err.message,
    api: req.url,
    method: req.method,
    body: req.body,
    decryptedBody: req.body.encryptedData
      ? decryptData(req.body.encryptedData)
      : req.body,
    client: req.ip,
    stack: err.stack,
  };


  // if (process.env.NODE_ENV == 'production') {
  //   await sendMessage({
  //     sourceModule: 'globalErrorHandler',
  //     status: err.status,
  //     message: err.stack.replace('\n', ''),
  //     customerId: req.customerId ? req.customerId : null,
  //     name: first_name ? first_name : 'No customer',
  //     mobile: mobile_number ? mobile_number : 'No mobile number',
  //     payload: JSON.stringify(req.body),
  //     stack: err.stack,
  //     //isM2p: false, //should be true if called from m2p support file
  //     env: process.env.NODE_ENV,
  //     errorData: JSON.stringify(errorDataForSlack),
  //   });

  //   const createErrorLogs = await db.error_log.create({
  //     level: 'error',
  //     error: JSON.stringify(err?.response?.data),
  //     errorDescription: JSON.stringify(err),
  //     name: err.name,
  //     message: err.message,
  //     api: req.url,
  //     method: req.method,
  //     body: [req.body],
  //     decryptedBody: [
  //       req.body.encryptedData ? decryptData(req.body.encryptedData) : req.body,
  //     ],
  //     client: req.ip,
  //     customerId: req.customerId ? req.customerId : null,
  //     mobile: mobile_number ? mobile_number : 'No mobile number',
  //     stack: [err.stack],
  //   });
  // }

  if (process.env.NODE_ENV === 'test') {
    console.log(errorDataForSlack);
    logToFile.log(errorDataForSlack);
  } else {
    console.log(errorDataForSlack);
    logToFile.log(errorDataForSlack);
    console.log(err);
    log.error(JSON.stringify(err));
  }

  // catch all api errors
  // if (err instanceof APIError) {
  //   return res.status(err.status).send({
  //     success: false,
  //     message: err.message,
  //     timestamp: new Date()
  //   });
  // }

  if (err instanceof APIError) {
    return res.status(err.status).send({
      success: false,
      type: 'error',
      message: err.message,
      data: {},
    });
  }

  if (err instanceof UnProcessableEntityError) {
    return res.status(err.status).send({
      success: false,
      type: 'error',
      message: err.message,
      data: {},
    });
  }

  if (err instanceof BadRequestError) {
    return res.status(err.status).send({
      success: false,
      type: 'error',
      message: err.message,
      data: errorData,
    });
  }

  // m2p handler

  // if (err instanceof ZetaError) {
  //   return res.status(err.status).send({
  //     success:false,
  //     type: "error",
  //     message: err.message,
  //     data: {  },
  //   });
  // }

  // if (err instanceof PaytmError) {
  //   return res.status(err.status).send({
  //     success: false,
  //     type: 'error',
  //     message: err.message,
  //     data: {},
  //   });
  // }

  if (err instanceof UnauthorizedError) {
    return res.status(err.status).send({
      success: false,
      type: 'error',
      message: err.message,
      data: {},
    });
  }

  if (err instanceof ConflictError) {
    return res.status(err.status).send({
      success: false,
      type: 'error',
      message: err.message,
      data: errorData,
    });
  }

  if (db.ConnectionRefusedError && err instanceof db.ConnectionRefusedError) {
    return res.status(500).send({
      success: false,
      type: 'error',
      message: 'Could not connect to database!',
      data: {},
    });
  } else if (
    db.ConnectionTimedOutError &&
    err instanceof db.ConnectionTimedOutError
  ) {
    return res.status(500).send({
      success: false,
      type: 'error',
      message: 'Connection timed out!',
      data: {},
    });
  } else if (
    db.ForeignKeyConstraintError &&
    err instanceof db.ForeignKeyConstraintError
  ) {
    return res.status(500).send({
      success: false,
      type: 'error',
      message: 'Failed to insert data!',
      data: {},
    });
  } else if (
    db.UniqueConstraintError &&
    err instanceof db.UniqueConstraintError
  ) {
    return res.status(400).send({
      success: false,
      type: 'error',
      message: err.errors[0].message,
      data: {},
    });
  } else if (db.DatabaseError && err instanceof db.DatabaseError) {
    return res.status(400).send({
      success: false,
      type: 'error',
      message: 'Something went wrong!',
      data: {},
    });
  }

  // connect all errors
  return res.status(500).send({
    success: false,
    type: 'error',
    message: 'Something went wrong!',
    data: errorData,
  });
};
