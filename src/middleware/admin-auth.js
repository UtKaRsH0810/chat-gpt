const db = require('../db/models');
const { verify } = require('../utils');

module.exports = (roles = []) => {
  roles = [...roles, 'SUPER_ADMIN'];

  return async (req, res, next) => {
    try {
      const { headers } = req;

      if (!headers || !headers.authorization) {
        throw new BadRequestError('headers not provided!');
      }
      const token = headers.authorization;
      const decodedData = await verify(token);
      console.log('-----------', decodedData.userId);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedError(`Token is Expired`);
      } else if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedError(`Invalid token`);
      }
      throw err;
    }
  };
};
