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
exports.courseController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const course_service_1 = require("./course.service");
const createCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.courseService.createCourse(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Course Create Done",
        success: true,
        data: result,
    });
}));
const getAllCourses = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield course_service_1.courseService.getAllCourses(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Course Getting Done",
        success: true,
        data: result,
    });
}));
const getSingleCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const result = yield course_service_1.courseService.getCourseById(courseId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "A Course Getting Done",
        success: true,
        data: result,
    });
}));
const updateCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const payload = req.body;
    const result = yield course_service_1.courseService.updateCourse(courseId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Course Update Done",
        success: true,
        data: result,
    });
}));
const deleteCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const result = yield course_service_1.courseService.deleteCourse(courseId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Course Delete Done",
        success: true,
        data: result,
    });
}));
exports.courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
};
