const { Kafka } = require('kafkajs');
const config = require('config');
const { log, logToFile } = require('./logger');


if (!config.has('kafkaConfig')) {
  throw new BadRequestError('kafkaConfig not found!');
}

const kafkaConfig = config.get('kafkaConfig')

const { broker, clientId } = kafkaConfig;
const brokers = [`${broker}`]

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({
  clientId,
  brokers,
});
const producer = kafka.producer({
  allowAutoTopicCreation: true,
});

const connectKafkaProducer = async () => {
  try {
    await producer.connect();
    console.log(
      '-------------- Kafka Producer Connected ----------------------'
    );
  } catch (error) {
    throw error;
  }
};

connectKafkaProducer()
const messageProducer = async ({data, topic}) => {
  try {
    await producer.send({ topic, messages:[{value:JSON.stringify(data)}] });
    log.info(`Message produced: Topic: ${topic} ${JSON.stringify(data)}`);
    return true
  } catch (error) {
    console.log(error)
    log.error(`Error in produceMessage: ${JSON.stringify(error)}`);
    return false
  }
};


module.exports = messageProducer;
