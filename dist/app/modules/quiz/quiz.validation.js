"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizValidation = void 0;
const zod_1 = require("zod");
const submitQuizSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: zod_1.z.string().nonempty("Student ID is required"),
        answers: zod_1.z
            .array(zod_1.z.number().int().nonnegative())
            .min(1, "Answers array cannot be empty"),
    }),
});
exports.quizValidation = { submitQuizSchema };
