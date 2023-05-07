const { Joi } = require('../../../support');
const { validateEmptyReqBody } = require('../../../utils');
const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

module.exports.sampleController = (httpRequest) => {
  const schema = Joi.object({
    mobile: Joi.string().required(),
  });
  return schema.validate(httpRequest.body, options);
};