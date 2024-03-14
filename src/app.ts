import { Transaction } from "./models/transaction.model";
import baseRouter from "./routes/index.route";
import { getCurrentBalance } from "./services/balance.service";
import { processTransaction } from "./services/transaction.service";



 

async function runFunctions() {
  try {
    // Run getCurrentBalance function
    const userId = '1';
    const balance = await getCurrentBalance(userId);
    console.log(`Current balance for user ${userId}: $${balance}`);


    const transactionData = {
      idempotentKey: 'unique-key', // Use a unique key for idempotency
      userId: '1',
      amount: 10, // Amount to credit or debit
      type: 'credit' as unknown as Transaction, // 'credit' or 'debit'
    };

    // Run transact function
    const idempotentKey = 'txn-123d';
    const amount = 10;
    const type: 'credit' | 'debit' = 'debit'; // or 'debit'
    const transactResponse = await processTransaction({idempotentKey, userId, amount, type});
    console.log("transactResponse : ",transactResponse)
    console.log(`Transaction completed. Type: ${type}, Amount: $${amount}`);
  } catch (error:any) {
    console.error('An error occurred:', error.message);
  }
}



import express from "express";



const app: express.Application = express();

app.use(express.json());


app.use("/api", baseRouter);

// Start the server on port 3000
const server = app.listen(3000, () => {
  console.log("Server started on port 3000.");
});

export { app, server };