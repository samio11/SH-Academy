"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentValidation = void 0;
const zod_1 = require("zod");
const enrollStudentSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.string().nonempty("Student ID is required"),
        course: zod_1.z.string().nonempty("Course ID is required"),
        batchName: zod_1.z.string().optional(),
    }),
});
const markLessonCompleteSchema = zod_1.z.object({
    body: zod_1.z.object({
        lessonIndex: zod_1.z
            .number()
            .int("Lesson index must be an integer")
            .nonnegative("Lesson index must be >= 0"),
    }),
});
exports.enrollmentValidation = {
    enrollStudentSchema,
    markLessonCompleteSchema,
};
