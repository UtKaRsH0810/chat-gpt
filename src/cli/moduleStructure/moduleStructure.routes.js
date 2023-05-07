module.exports = ({
  router,
  makeValidatorCallback,
  makeExpressCallback,
  validator,
  controller
}) => {

  router.post(
    "/",
    makeValidatorCallback(validator.sampleController),
    makeExpressCallback(controller.sampleController)
  );

  return router;
};
