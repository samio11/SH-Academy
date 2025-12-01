import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GlobalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { NotFound } from "./app/middlewares/NotFound";
import { rootRouter } from "./app/routes";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", rootRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "SH-Academy Server is running successfully🎓",
    uptime: process.uptime().toFixed(2) + " sec",
    timeStamp: new Date().toISOString(),
  });
});

app.use(GlobalErrorHandler);
app.use(NotFound);

export default app;
