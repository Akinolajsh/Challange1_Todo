import express, { Application } from "express";
import { mainApp } from "./mainApp";
import mongoose from "mongoose";

const port: number = 4455;

const url:string= "mongodb://127.0.0.1:27017/TodoDB"

const app: Application = express();

mainApp(app);

const server = app.listen( port, () => {
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
