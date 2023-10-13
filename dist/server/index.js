"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT);
const url = process.env.DATABASE;
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
const server = app.listen(process.env.PORT || port, () => {
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
