"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
const mongoose_1 = require("mongoose");
const EnrollmentSchema = new mongoose_1.Schema({
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course" },
    batchName: { type: String },
    completedLessons: [Number],
    progressPercent: { type: Number, default: 0 },
}, { timestamps: true, versionKey: false });
exports.Enrollment = (0, mongoose_1.model)("Enrollment", EnrollmentSchema);
