const sampleController =
  ({ doSampleController }) =>
  async (httpRequest) => {
    const userData = httpRequest.body;
    const { customerId } = httpRequest;
    const payload = {
      userData,
      customerId,
    };
    const userResponse = await doSampleController(payload);
    return {
      statusCode: 200,
      body: {
        success: true,
        type: 'success',
        message: 'sample component response!',
        data: userResponse,
      },
    };
  };

module.exports = { sampleController };
