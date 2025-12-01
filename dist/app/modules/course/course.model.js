"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
// models/Course.model.ts
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: Number,
    category: { type: String, required: true },
    syllabus: [{ type: String }],
    lessons: [
        {
            title: { type: String, required: true },
            videoUrl: { type: String, required: true },
        },
    ],
    batches: [
        {
            name: { type: String, required: true },
            startDate: { type: Date, required: true },
        },
    ],
}, { timestamps: true, versionKey: false });
exports.Course = (0, mongoose_1.model)("Course", CourseSchema);
