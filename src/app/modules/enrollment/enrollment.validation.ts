import { z } from "zod";

const enrollStudentSchema = z.object({
  body: z.object({
    student: z.string().nonempty("Student ID is required"),
    course: z.string().nonempty("Course ID is required"),
    batchName: z.string().optional(),
  }),
});

const markLessonCompleteSchema = z.object({
  body: z.object({
    lessonIndex: z
      .number()
      .int("Lesson index must be an integer")
      .nonnegative("Lesson index must be >= 0"),
  }),
});

export const enrollmentValidation = {
  enrollStudentSchema,
  markLessonCompleteSchema,
};
