const config = require('config');
const {validateConfig} = require('../utils');
if (process.env.NODE_ENV) {
  const { error } = validateConfig(config);
  if (error) {
    throw new Error(error.message);
  }
  console.log('Configs loaded successfully!');
}
