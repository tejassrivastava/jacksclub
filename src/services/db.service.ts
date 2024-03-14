import { dynamoDB, dynamoDBDocClient } from '../db/dynamodb';
export const createTablesService = async (): Promise<void> => {
    const paramsUserTable = {
      TableName: 'UserTable',
      KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    };
  
    const paramsTransactionTable = {
      TableName: 'TransactionTable',
      KeySchema: [{ AttributeName: 'idempotentKey', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'idempotentKey', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    };
  
    try {
      await dynamoDB.createTable(paramsUserTable).promise();
      await dynamoDB.createTable(paramsTransactionTable).promise();
    } catch (error) {
      console.error('Error creating tables:', error);
      throw error;
    }
  };

  export const insertSeedDataService = async (userId:string, balance:number): Promise<void> => {
    const userParams = {
      TableName: 'UserTable',
      Item: {
        userId: userId,
        balance: balance,
      },
    };
  
    try {
      await dynamoDBDocClient.put(userParams).promise();
    } catch (error) {
      console.error('Error inserting seed data:', error);
      throw error;
    }
  };