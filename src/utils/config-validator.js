const { Joi } = require('../support');
function validateConfig(configs) {
  const schema = Joi.object({
    PORT: Joi.number().port().required(),
    NODE_ENV: Joi.string().valid('production', 'pre-prod', 'test').required(),
  }).unknown(true);
  return schema.validate(configs);
}
module.exports = validateConfig;
