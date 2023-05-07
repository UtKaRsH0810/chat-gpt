const {
  NODE_ENV,
  ENCRYPTION_SECRET_KEY,
  JWT_SECRET_KEY,
  JWT_REFERESH_SESSION_TIMEOUT,
  JWT_SESSION_TIMEOUT,
  SENDGRID_API_KEY,
  SEDGRID_SENDER_EMAIL_ID,
  KAFKA_BROKER_PROD,
  KAFKA_CLIENT_ID_PROD
} = process.env;

module.exports = {
  
  Environment: {
    environmentKey: NODE_ENV,
  },
  Encryption:{
    encryptionSecretKey:ENCRYPTION_SECRET_KEY
  },
  jwt:{
    jwtSecretKey:JWT_SECRET_KEY,
    refreshSessionTimeout:JWT_REFERESH_SESSION_TIMEOUT,
    sessionTimeout:JWT_SESSION_TIMEOUT
  },
  sendGridConfig:{
    apiKey:SENDGRID_API_KEY, 
    senderEmail:SEDGRID_SENDER_EMAIL_ID
  },
  kafkaConfig:{ 
    broker:KAFKA_BROKER_PROD, 
    clientId:KAFKA_CLIENT_ID_PROD
  } 
  
  
};
