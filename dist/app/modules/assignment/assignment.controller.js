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
exports.assignmentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const assignment_service_1 = require("./assignment.service");
const createAssignment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield assignment_service_1.assignmentService.createAssignment(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Assignment created successfully",
        success: true,
        data: result,
    });
}));
const getAssignment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, lessonIndex } = req.query;
    const result = yield assignment_service_1.assignmentService.getAssignment(String(courseId), Number(lessonIndex));
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Assignment fetched successfully",
        success: true,
        data: result,
    });
}));
const getAllAssignmentAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (req === null || req === void 0 ? void 0 : req.query) || "";
    const result = yield assignment_service_1.assignmentService.getAllAssignmentAdmin(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Assignment fetched successfully",
        success: true,
        data: result,
    });
}));
const submitAssignment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield assignment_service_1.assignmentService.submitAssignment(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Assignment submitted successfully",
        success: true,
        data: result,
    });
}));
const reviewAssignment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { studentId, score } = req.body;
    const result = yield assignment_service_1.assignmentService.reviewAssignment(id, studentId, score);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Assignment reviewed successfully",
        success: true,
        data: result,
    });
}));
exports.assignmentController = {
    createAssignment,
    getAssignment,
    submitAssignment,
    reviewAssignment,
    getAllAssignmentAdmin,
};
