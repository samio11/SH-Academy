"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = void 0;
const mongoose_1 = require("mongoose");
const AssignmentSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course" },
    lessonIndex: { type: Number, required: true },
    title: { type: String, required: true },
    instructions: { type: String, required: true },
    deadLine: { type: Date, required: true },
    submissions: [
        {
            student: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            answerLink: { type: String },
            answerText: { type: String },
            score: { type: Number },
        },
    ],
}, { timestamps: true, versionKey: false });
exports.Assignment = (0, mongoose_1.model)("Assignment", AssignmentSchema);
