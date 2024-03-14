import { dynamoDBDocClient } from '../db/dynamodb';
import { Transaction } from '../models/transaction.model';

export const processTransaction = async (transaction: Transaction): Promise<void> => {
  console.log("In Process Transaction")
  const { idempotentKey, userId, amount, type } = transaction;

    // Get current balance before update
    const getParams = {
      TableName: 'UserTable',
      Key: { userId },
      ProjectionExpression: 'balance',
    };
  
    let currentBalance;
    try {
      console.log("in getResponse")
      const getResponse = await dynamoDBDocClient.get(getParams).promise();
      console.log("getResponse : ",getResponse);
      currentBalance = getResponse.Item?.balance  // Handle potential missing balance
      console.log("currentBalance : ",currentBalance)
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error; // Re-throw the error to indicate failure
    }
  
    // Check if balance is sufficient for debit

    if (type === 'debit' && currentBalance <= amount) {
      console.warn('Insufficient funds for debit transaction. User ID:', userId);
      throw new Error('Insufficient Funds');
      
    }

  const params = {
    TransactItems: [
      {
        Update: {
          TableName: 'UserTable',
          Key: { userId },
          UpdateExpression: type === 'credit' ? 'ADD balance :amount' : 'SET balance = balance - :amount',
          ConditionExpression: type === 'debit' ? 'balance >= :amount' : undefined,
          ExpressionAttributeValues: {
            ':amount': amount,
          },
        },
      },
      {
        Put: {
          TableName: 'TransactionTable',
          Item: {
            idempotentKey,
            userId,
            amount,
            type,
            timestamp: new Date().toISOString(),
          },
          
          ConditionExpression: 'attribute_not_exists(idempotentKey)'
        },
      },
    ],
  };

  try {
    console.log("asdasdasdasd")
    await dynamoDBDocClient.transactWrite(params).promise();
  } catch (error:any) {
    
    if (error.code === 'TransactionCanceledException' && error.CancellationReasons.some((reason: any) => reason.Code === 'ConditionalCheckFailed')) {
     
      // This means the idempotentKey already exists in TransactionTable, so it's a duplicate request
    
      console.warn('Duplicate transaction detected. Idempotent key:', idempotentKey);
      throw Error("Duplicate Transaction") ;
    }
    console.error('Error in processTransaction:', error);
    throw error;
  }
};
