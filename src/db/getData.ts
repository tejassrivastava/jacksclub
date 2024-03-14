import * as AWS from 'aws-sdk';
import { User } from '../models/user.model';

AWS.config.update({
  region: 'local',
  credentials: {
    accessKeyId: 'MYACCESSKEY',
    secretAccessKey: 'MYSECRETKEY'
  }
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: "local",
  endpoint: "http://localhost:8000"
});

export const getSeedData = async (): Promise<User[]> => {
  const userParams = {
    TableName: 'UserTable',
    
  };

  try {
    const response = await dynamoDB.scan(userParams).promise();
    return response.Items?.map((item) => ({ ...item })) as User[];
  } catch (error) {
    console.error('Error inserting seed data:', error);
    throw error;
  }
};
const d = getSeedData();
console.log("d",d);