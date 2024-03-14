import { dynamoDBDocClient } from './dynamodb';


export const insertSeedData = async (): Promise<void> => {
  const userParams = {
    TableName: 'UserTable',
    Item: {
      userId: '1',
      balance: 100,
    },
  };

  try {
    await dynamoDBDocClient.put(userParams).promise();
  } catch (error) {
    console.error('Error inserting seed data:', error);
    throw error;
  }
};
insertSeedData();