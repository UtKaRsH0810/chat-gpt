



function loadRoutes(router) {
 


  if (process.env.NODE_ENV === 'test') {
    router.use('/health', (req, res) =>
      res.send('HEALTHY MAMASTOP SERVER IN TEST')
    );
  } else {
    router.use('/health', (req, res) => res.send('HEALTHY MAMASTOP SERVER IN TEST'));
  }

  return router;
}

module.exports = loadRoutes;
