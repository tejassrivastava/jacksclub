import { dynamoDBDocClient } from '../db/dynamodb';
import { User } from '../models/user.model';

export const getCurrentBalance = async (userId: string): Promise<number> => {
  try {
    const params = {
      TableName: 'UserTable',
      Key: { userId },
    };

    const result = await dynamoDBDocClient.get(params).promise();
    console.log("result.Item?.balance  : ",result.Item?.balance )
    return result.Item?.balance || 100; // Default balance of 100 USD
  } catch (error) {
    console.error('Error in getCurrentBalance:', error);
    throw error;
  }
};
