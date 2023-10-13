"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const mongoose_1 = __importDefault(require("mongoose"));
const port = 4455;
const url = "mongodb://127.0.0.1:27017/TodoDB";
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
const server = app.listen(port, () => {
    mongoose_1.default.connect(url).then(() => {
        console.log("connected...🚀🚀🚀");
    });
});
process.on("uncaughtException", (error) => {
    console.log("shutting down due to uncaughtException Error");
    console.log("Error: ", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("shutting down due to unhandledRejection Error");
    console.log("Error: ", reason);
    server.close(() => {
        process.exit(1);
    });
});