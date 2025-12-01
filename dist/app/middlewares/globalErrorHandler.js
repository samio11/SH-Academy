"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
const AppError_1 = require("../errors/AppError");
const config_1 = __importDefault(require("../config"));
const HandleDuplicateError_1 = require("../errors/HandleDuplicateError");
const HandleCastError_1 = require("../errors/HandleCastError");
const HandleValidationError_1 = require("../errors/HandleValidationError");
const HandleZodError_1 = require("../errors/HandleZodError");
const GlobalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Error Occurs";
    let errorSources = [
        {
            path: "",
            message: "Opps! Error Occurs",
        },
    ];
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const x = (0, HandleDuplicateError_1.handleDuplicateError)(err);
        statusCode = x.statusCode;
        message = x.message;
        errorSources = x.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const x = (0, HandleCastError_1.handleCastError)(err);
        statusCode = x.statusCode;
        message = x.message;
        errorSources = x.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const x = (0, HandleValidationError_1.handleValidationError)(err);
        statusCode = x.statusCode;
        message = x.message;
        errorSources = x.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ZodError") {
        const x = (0, HandleZodError_1.handleZodError)(err);
        statusCode = x.statusCode;
        message = x.message;
        errorSources = x.errorSources;
    }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : "",
    });
};
exports.GlobalErrorHandler = GlobalErrorHandler;
