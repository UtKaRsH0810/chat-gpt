const { sequelize } = require('../db/models');

sequelize
  .authenticate()
  .then(() => console.log('Connected to db successfully!'))
  .catch((err) => {
    throw new Error('Failed to connect to database!');
  });
