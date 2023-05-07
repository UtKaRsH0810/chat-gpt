const { Joi } = require('../../../support');
const { validateEmptyReqBody } = require('../../../utils');
const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

module.exports.logIn = (httpRequest) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    password: Joi.string().required(),
    remember_me: Joi.boolean(),
  });
  return schema.validate(httpRequest.body, options);
};

module.exports.resetPassword = (httpRequest) => {
  const schema = Joi.object({
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
    confirm_password: Joi.string().required(),
  });
  return schema.validate(httpRequest.body, options);
};
