"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const router = express_1.default.Router();
router.route("/create-user").post(authController_1.createUser);
router.route("/sign-in-user").post(authController_1.signinUser);
router.route("/view-user").get(authController_1.findUsers);
router.route("/:UserID/view-user").get(authController_1.findOneUser);
router.route("/UserID/delete").delete(authController_1.deleteOneUser);
exports.default = router;
