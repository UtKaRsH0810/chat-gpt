const logIn =
  ({ doLogIn }) =>
  async (httpRequest) => {
    const body = httpRequest.body;
    const payload = {
      body,
    };
    const userResponse = await doLogIn(payload);
    return {
      statusCode: 200,
      body: {
        success: true,
        type: 'success',
        message: 'User loggedIn!',
        data: userResponse,
      },
    };
  };

const resetPassword =
  ({ doResetPassword }) =>
  async (httpRequest) => {
    const user = httpRequest.user;
    const bodyData = httpRequest.body;
    const payload = {
      user,
      bodyData,
    };
    const userResponse = await doResetPassword(payload);
    return {
      statusCode: 200,
      body: {
        success: true,
        type: 'success',
        message: 'data updated',
        data: userResponse,
      },
    };
  };

module.exports = {
  logIn,
  resetPassword,
};
