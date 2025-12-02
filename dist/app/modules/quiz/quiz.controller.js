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
exports.quizController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const quiz_service_1 = require("./quiz.service");
const createQuiz = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield quiz_service_1.quizService.createQuiz(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Quiz created successfully",
        success: true,
        data: result,
    });
}));
const getQuiz = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, lessonIndex } = req.query;
    const result = yield quiz_service_1.quizService.getQuiz(String(courseId), Number(lessonIndex));
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Quiz fetched successfully",
        success: true,
        data: result,
    });
}));
const getAllQuizAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (req === null || req === void 0 ? void 0 : req.query) || "";
    const result = yield quiz_service_1.quizService.getAllQuizAdmin(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Quiz fetched successfully",
        success: true,
        data: result,
    });
}));
const submitQuiz = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quizId } = req.params;
    const { studentId, answers } = req.body;
    const result = yield quiz_service_1.quizService.submitQuiz(quizId, studentId, answers);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Quiz submitted successfully",
        success: true,
        data: result,
    });
}));
exports.quizController = {
    createQuiz,
    getQuiz,
    submitQuiz,
    getAllQuizAdmin,
};
