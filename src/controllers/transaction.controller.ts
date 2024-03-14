import { Request, Response } from "express";
import { processTransaction } from "../services/transaction.service";


export const transact = async (req: Request, res: Response) => {
  console.log("in transact");
  try {
    const {idempotentKey, userId, amount, type} = req.body
    const transactResponse = await processTransaction({idempotentKey, userId, amount, type});
    console.log("transactResponse con : ",transactResponse)
    console.log(`Transaction completed. con Type: ${type}, Amount: $${amount}`);
    
    res.status(201).json({
        type: type,
        amount: amount
    });
  } catch (error:any) {
    console.log("error cont",error.message);
    
      res.status(500).json({ error: error.message });  
    
    
  }
};