import { z } from "zod";

const createAssignmentSchema = z.object({
  body: z.object({
    course: z.string().nonempty("Course ID is required"),
    lessonIndex: z.number().min(0, "Lesson index is required"),
    title: z.string().nonempty("Title is required"),
    instructions: z.string().nonempty("Instructions are required"),
    deadLine: z.date(),
  }),
});

const submitAssignmentSchema = z.object({
  body: z.object({
    student: z.string().nonempty("Student id is required"),
    answerLink: z.string().url().optional(),
    answerText: z.string().optional(),
  }),
});

export const reviewAssignmentSchema = z.object({
  body: z.object({
    studentId: z.string().nonempty("Student ID is required"),
    score: z.number().min(0).max(100),
  }),
});

export const assignmentValidation = {
  createAssignmentSchema,
  submitAssignmentSchema,
  reviewAssignmentSchema,
};
