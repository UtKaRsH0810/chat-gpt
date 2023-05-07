const { Op } = require('sequelize');
const db = require('../../../db/models');
const { verifyHashPassword, sign } = require('../../../utils/jwt');
const { generateHash } = require('../../../utils/password-handler');

const doLogIn = async (payload) => {
  try {
    const { body } = payload;
    const { user_id, password, remember_me } = body;

    const user = await db.user.scope(null).findOne({
      where: {
        unique_id: user_id,
      },
    });
    if (!user) {
      throw new BadRequestError('user not found');
    }

    const is_match = await verifyHashPassword({
      password,
      hashPassword: user.password,
    });

    if (!is_match) {
      throw new BadRequestError("Password doesn't match");
    }

    const { id, account_status } = user;
    if (account_status != 'ACTIVE') {
      throw new BadRequestError('User Not Active');
    }
    const accessToken = sign({ id }, remember_me);
    return { accessToken };
  } catch (err) {
    throw err;
  }
};

const doResetPassword = async (payload) => {
  try {
    const { user, bodyData } = payload;
    const { old_password, new_password, confirm_password } = bodyData;
    if (new_password != confirm_password) {
      throw new BadRequestError("passwords don't match");
    }
    let userCheck = await db.user.findByPk(user.user_id, {
      attributes: { include: ['password'] },
    });
    if (!userCheck) {
      throw new BadRequestError('user not found');
    }
    userCheck = JSON.parse(JSON.stringify(userCheck));

    const is_match = await verifyHashPassword({
      password: old_password,
      hashPassword: userCheck.password,
    });

    if (!is_match) {
      throw new BadRequestError('old and new password dont match');
    }

    const hashedPassword = await generateHash(new_password);
    userCheck.password = hashedPassword;
    return await db.user.update(
      {
        password: hashedPassword,
      },
      {
        where: { id: user.user_id },
      }
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  doLogIn,
  doResetPassword,
};
