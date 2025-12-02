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
exports.quizService = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../errors/AppError");
const quiz_model_1 = require("./quiz.model");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const createQuiz = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield quiz_model_1.Quiz.create(payload);
});
const getQuiz = (courseId, lessonIndex) => __awaiter(void 0, void 0, void 0, function* () {
    return yield quiz_model_1.Quiz.findOne({ course: courseId, lessonIndex });
});
const getAllQuizAdmin = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const quizQuery = new QueryBuilder_1.QueryBuilder(quiz_model_1.Quiz.find(), query);
    const quizData = quizQuery.filter().search([""]).sort().paginate().fields();
    const [data, meta] = yield Promise.all([
        yield quizData.build().populate("course", "title"),
        yield quizData.getMeta(),
    ]);
    return { data, meta };
});
const submitQuiz = (quizId, studentId, answers) => __awaiter(void 0, void 0, void 0, function* () {
    const quiz = yield quiz_model_1.Quiz.findById(quizId);
    if (!quiz)
        throw new AppError_1.AppError(404, "Quiz not found");
    let score = 0;
    quiz.questions.forEach((q, index) => {
        if (answers[index] === q.correctIndex)
            score++;
    });
    quiz.results.push({ student: new mongoose_1.Types.ObjectId(studentId), score });
    yield quiz.save();
    return { score };
});
exports.quizService = { createQuiz, getQuiz, submitQuiz, getAllQuizAdmin };
