const router = require('express').Router();
const {
  makeExpressCallback,
  makeValidatorCallback,
} = require('../../../middleware');

const MODULE_NAME = 'sampleComponent';

// validator
const validator = require(`./${MODULE_NAME}.validator`);
const _controller = require(`./${MODULE_NAME}.controller`);

//service
const service = require(`./${MODULE_NAME}.service`);
const serviceNames = Object.keys(service);

const controller = {};

serviceNames.forEach((serviceName) => {
  const _controllerName = serviceName.replace('do', '');
  const controllerName = _controllerName.charAt(0).toLowerCase() + _controllerName.slice(1);
  const serviceFunction = service[serviceName];
  const controllerFunction = _controller[controllerName]({ [serviceName]: serviceFunction });
  controller[controllerName] = controllerFunction;
});

const routes = require(`./${MODULE_NAME}.routes`)({
  router,
  validator,
  makeValidatorCallback,
  makeExpressCallback,
  controller,
});

module.exports = { [`${MODULE_NAME}Routes`]: routes };
