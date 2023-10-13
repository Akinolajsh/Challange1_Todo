"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = exports.deleteTask = exports.getOneTask = exports.createTask = void 0;
const taskModel_1 = __importDefault(require("../model/taskModel"));
const authModel_1 = __importDefault(require("../model/authModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { task, priority, email } = req.body;
        const check = yield authModel_1.default.findOne({ email });
        const tasks = yield taskModel_1.default.create({
            task,
            priority,
        });
        (_a = check === null || check === void 0 ? void 0 : check.task) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(tasks.id));
        check === null || check === void 0 ? void 0 : check.save();
        return res.status(201).json({
            message: "Task created successfully",
            data: tasks,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
});
exports.createTask = createTask;
const getOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskID } = req.params;
        const tasks = yield taskModel_1.default.findById({ taskID });
        return res.status(201).json({
            message: "Task found successfully",
            data: tasks,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
});
exports.getOneTask = getOneTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskID } = req.params;
        const tasks = yield taskModel_1.default.findByIdAndDelete(taskID);
        return res.status(201).json({
            message: "Task deleted successfully",
            data: tasks,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
});
exports.deleteTask = deleteTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskModel_1.default.find({});
        return res.status(201).json({
            message: "Task found successfully",
            data: tasks,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
});
exports.getTask = getTask;
