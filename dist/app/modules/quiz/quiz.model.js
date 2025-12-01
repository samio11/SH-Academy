"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
// models/Quiz.model.ts
const mongoose_1 = require("mongoose");
const QuizSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course" },
    lessonIndex: { type: Number, required: true },
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctIndex: { type: Number, required: true },
        },
    ],
    results: [
        {
            student: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            score: { type: Number, required: true },
        },
    ],
}, { timestamps: true });
exports.Quiz = (0, mongoose_1.model)("Quiz", QuizSchema);
