"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentValidation = exports.reviewAssignmentSchema = void 0;
const zod_1 = require("zod");
const createAssignmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        course: zod_1.z.string().nonempty("Course ID is required"),
        lessonIndex: zod_1.z.number().min(0, "Lesson index is required"),
        title: zod_1.z.string().nonempty("Title is required"),
        instructions: zod_1.z.string().nonempty("Instructions are required"),
        deadLine: zod_1.z
            .string()
            .nonempty("Start date is required")
            .transform((val) => new Date(val)),
    }),
});
const submitAssignmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.string().nonempty("Student id is required"),
        answerLink: zod_1.z.string().url().optional(),
        answerText: zod_1.z.string().optional(),
    }),
});
exports.reviewAssignmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: zod_1.z.string().nonempty("Student ID is required"),
        score: zod_1.z.number().min(0).max(100),
    }),
});
exports.assignmentValidation = {
    createAssignmentSchema,
    submitAssignmentSchema,
    reviewAssignmentSchema: exports.reviewAssignmentSchema,
};
