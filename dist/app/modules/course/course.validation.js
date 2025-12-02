"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
const createCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty("Title is required"),
        description: zod_1.z.string().nonempty("Description is required"),
        instructor: zod_1.z.string().nonempty("Instructor ID is required"),
        price: zod_1.z.number().nonnegative("Price must be non-negative").optional(),
        category: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        syllabus: zod_1.z.array(zod_1.z.string()).optional(),
        lessons: zod_1.z
            .array(zod_1.z.object({
            title: zod_1.z.string().nonempty("Lesson title is required"),
            videoUrl: zod_1.z.string().url("Invalid video URL"),
        }))
            .min(1, "At least one lesson is required"),
        batches: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string().nonempty("Batch name is required"),
            startDate: zod_1.z
                .string()
                .nonempty("Start date is required")
                .transform((val) => new Date(val)),
        }))
            .optional(),
    }),
});
const updateCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        instructor: zod_1.z.string().optional(),
        price: zod_1.z.number().nonnegative().optional(),
        category: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        syllabus: zod_1.z.array(zod_1.z.string()).optional(),
        lessons: zod_1.z
            .array(zod_1.z.object({
            title: zod_1.z.string(),
            videoUrl: zod_1.z.string().url(),
        }))
            .optional(),
        batches: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string(),
            startDate: zod_1.z.date(),
        }))
            .optional(),
    }),
});
exports.courseValidation = { createCourseSchema, updateCourseSchema };
