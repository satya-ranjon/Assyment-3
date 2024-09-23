import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import { ZodError } from "zod";

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// application router
app.use("/api", router);

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running....");
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
