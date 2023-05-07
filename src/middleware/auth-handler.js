const { verify } = require('../utils');
const db = require('../db/models');

module.exports = async (req, res, next) => {
  try {
    const { headers } = req;
    if (!headers || !headers.authorization) {
      throw new BadRequestError('headers not provided!');
    }
    const token = headers.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError(`Unauthorized access! Please login`);
    }
    const decoded = await verify(token);
    console.log('---------------->', decoded.id);

    const user = await db.user.findByPk(decoded.id);

    if (!user)
      throw new UnauthorizedError(
        `You are not a Customer or Manager. Please use Valid Authorization`
      );

    const { id } = user;

    req.user = { user_id: id, role: role_name };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new UnauthorizedError(`Token is Expired`);
    } else if (err.name === 'JsonWebTokenError') {
      throw new UnauthorizedError(`Invalid token`);
    }
    throw err;
  }
};
