import { Router } from "express";
import { transactRouter } from "./transaction.route";
import { userRouter } from "./user.route";
import { dbRouter } from "./db.route";


const baseRouter = Router();

baseRouter.use("/transact", transactRouter);

baseRouter.use("/user", userRouter);

baseRouter.use("/db", dbRouter);



export default baseRouter;