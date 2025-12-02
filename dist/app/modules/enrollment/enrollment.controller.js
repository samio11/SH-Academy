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
exports.enrollmentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const enrollment_service_1 = require("./enrollment.service");
const enrollStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrollment_service_1.enrollmentService.enrollStudent(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Enrollment successful",
        success: true,
        data: result,
    });
}));
const getStudentEnrollments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield enrollment_service_1.enrollmentService.getStudentEnrollments(studentId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Student enrollments fetched",
        success: true,
        data: result,
    });
}));
const getCourseEnrollments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield enrollment_service_1.enrollmentService.getCourseEnrollments(courseId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Course enrollments fetched",
        success: true,
        data: result,
    });
}));
const getAllEnrollmentAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (req === null || req === void 0 ? void 0 : req.query) || "";
    const result = yield enrollment_service_1.enrollmentService.getAllEnrollmentAdmin(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Course enrollments fetched",
        success: true,
        data: result,
    });
}));
const markLessonComplete = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { enrollmentId } = req.params;
    const { lessonIndex } = req.body;
    const result = yield enrollment_service_1.enrollmentService.markLessonComplete(enrollmentId, Number(lessonIndex));
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Lesson marked as complete",
        success: true,
        data: result,
    });
}));
exports.enrollmentController = {
    enrollStudent,
    getStudentEnrollments,
    getCourseEnrollments,
    markLessonComplete,
    getAllEnrollmentAdmin,
};
