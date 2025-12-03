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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStatusController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const adminState_services_1 = require("./adminState.services");
const getAdminStats = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminState_services_1.adminService.getAdminStats();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Admin status getting done",
        statusCode: 200,
        data: result,
    });
}));
const getEnrollmentTrends = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminState_services_1.adminService.getEnrollmentTrends();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Admin Enroll Trend done",
        statusCode: 200,
        data: result,
    });
}));
const getUserGrowth = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminState_services_1.adminService.getUserGrowth();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Admin Enroll Trend done",
        statusCode: 200,
        data: result,
    });
}));
exports.adminStatusController = {
    getAdminStats,
    getEnrollmentTrends,
    getUserGrowth,
};
