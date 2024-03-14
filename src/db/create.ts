import { dynamoDB } from './dynamodb';


export const createTables = async (): Promise<void> => {
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