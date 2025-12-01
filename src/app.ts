import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({
      message: "SH-Academy Server is running successfully🎓",
      uptime: process.uptime().toFixed(2) + " sec",
      timeStamp: new Date().toISOString(),
    });
});

export default app;
