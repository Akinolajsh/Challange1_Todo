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
exports.signinUser = exports.deleteOneUser = exports.findOneUser = exports.findUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authModel_1 = __importDefault(require("../model/authModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield authModel_1.default.create({
            userName,
            email,
            password: hashed,
        });
        res.status(201).json({
            message: "creating User",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.createUser = createUser;
const findUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find().sort({ createdAt: -1 });
        res.status(201).json({
            message: "find Users",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error finding User",
        });
    }
});
exports.findUsers = findUsers;
const findOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserID } = req.params;
        const user = yield authModel_1.default.findById(UserID);
        res.status(201).json({
            message: "find one Users",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error finding User",
        });
    }
});
exports.findOneUser = findOneUser;
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserID } = req.params;
        const user = yield authModel_1.default.findByIdAndDelete({ id: UserID });
        res.status(201).json({
            message: "find Users",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error finding User",
        });
    }
});
exports.deleteOneUser = deleteOneUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authModel_1.default.findOne({ email });
        if (user) {
            const checkPassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (checkPassword) {
                return res.status(201).json({
                    message: "user sign in",
                    data: user._id,
                });
            }
            else {
                res.status(404).json({ message: "password not correct" });
            }
        }
        else {
            res.status(404).json({ message: "user not found" });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "Error finding User",
        });
    }
});
exports.signinUser = signinUser;
