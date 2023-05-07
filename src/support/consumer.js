// const Kafka = require("node-rdkafka");
const { Kafka } = require('kafkajs');
const config = require('config');
const { CONSUMER_TOPICS } = require('../constant/kafkaConstant');
const { log, logToFile } = require('./logger');
const consumeMessage = require('./consumeMessage');
if (!config.has('kafkaConfig')) {
  throw new BadRequestError('kafkaConfig not found!');
}
const kafkaConfig = config.get('kafkaConfig');

const { broker, clientId } = kafkaConfig;

const brokers = [`${broker}`];
const kafka = new Kafka({ clientId, brokers });

const consumer = kafka.consumer({
  groupId: clientId,
  allowAutoTopicCreation: true,
});
const connectKafkaConsumer = async () => {
  try {
    await consumer.subscribe({
      topics: Object.values(CONSUMER_TOPICS),
      fromBeginning: true,
    });
    await consumer.connect();

    console.log(
      '-------------- Kafka Consumer Connected ----------------------'
    );
  } catch (error) {
    console.error(error);
  }
};

const messageConsumer = async () => {
  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: ({ topic, partition, message, heartbeat, pause }) => {
      const data = JSON.parse(Buffer.from(message.value).toString());
      console.log(data);
      try {
        consumeMessage({ topic, data });
      } catch (error) {
        console.log(error);
        log.error(`Error in consumer run: ${JSON.stringify(error)}`);
      }
    },
  });
};

connectKafkaConsumer()
  .then(() => {
    messageConsumer();
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = messageConsumer;
