const db = require('../../../db/models');

const doSampleController = async (payload) => {
  try {
    const { customerId, userData } = payload;
    let { mobile } = userData;
    if(!mobile){
      throw new BadRequestError("Mobile doesn/'t exist!");
    }
    return {mobile};
  } catch (err) {
    throw err
  }
};

module.exports = {
  doSampleController
};
