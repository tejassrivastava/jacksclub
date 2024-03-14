import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'local',
  credentials: {
    accessKeyId: 'MYACCESSKEY',
    secretAccessKey: 'MYSECRETKEY'
  }
});

export const dynamoDB = new AWS.DynamoDB({
  region: "local",
  endpoint: "http://localhost:8000"
});

export const dynamoDBDocClient = new AWS.DynamoDB.DocumentClient({
  region: "local",
  endpoint: "http://localhost:8000"
});



