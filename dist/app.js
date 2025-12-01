"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res
        .status(200)
        .json({
        message: "SH-Academy Server is running successfully🎓",
        uptime: process.uptime().toFixed(2) + " sec",
        timeStamp: new Date().toISOString(),
    });
});
exports.default = app;
