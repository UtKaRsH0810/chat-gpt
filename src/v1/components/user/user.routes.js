const { userLoggedIn, pagination } = require('../../../middleware');

module.exports = ({
  router,
  makeValidatorCallback,
  makeExpressCallback,
  validator,
  controller,
}) => {
  router.post(
    '/login',
    makeValidatorCallback(validator.logIn),
    makeExpressCallback(controller.logIn)
  );

  router.post(
    '/reset-password',
    userLoggedIn,
    makeValidatorCallback(validator.resetPassword),
    makeExpressCallback(controller.resetPassword)
  );

  return router;
};
