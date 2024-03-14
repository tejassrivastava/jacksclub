import { Request, Response } from "express";

import { getCurrentBalance } from "../services/balance.service";


export const getUserDetails = async (req: Request, res: Response) => {
  console.log("in getUserDetails");
  try {
    
    const { id } = req.params;
    
    const balance = await getCurrentBalance(id);
    
    console.log(`Current balance for user ${id}: $${balance}`);
    
    res.status(200).json({"balance":balance});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};