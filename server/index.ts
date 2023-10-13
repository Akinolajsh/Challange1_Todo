import express, { Application } from "express";
import { mainApp } from "./mainApp";
import mongoose from "mongoose";
import env from "dotenv";
env.config()

const port: number = parseInt(process.env.PORT!);

const url:string= process.env.DATABASE!

const app: Application = express();

mainApp(app);

const server = app.listen( process.env.PORT || port, () => {
  mongoose.connect(url).then(() => {
    console.log("connected...🚀🚀🚀");
  });
});

process.on("uncaughtException", (error: Error) => {
  console.log("shutting down due to uncaughtException Error");
  console.log("Error: ", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("shutting down due to unhandledRejection Error");
  console.log("Error: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
