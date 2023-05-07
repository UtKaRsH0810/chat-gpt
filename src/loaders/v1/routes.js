const { customerLoggedIn } = require('../../middleware');
const userModule = require('../../v1/components/user/user.module');


function loadRoutes(router) {
  router.use('/user', userModule.userRoutes);

  if (process.env.NODE_ENV === 'test') {
    router.use('/health', (req, res) =>
      res.send('HEALTHY MAMASTOP SERVER IN TEST')
    );
  } else {
    router.use('/health', (req, res) =>
      res.send('HEALTHY MAMASTOP SERVER IN TEST')
    );
  }
  return router;
}

module.exports = loadRoutes;
