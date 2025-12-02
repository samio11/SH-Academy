import { z } from "zod";

const submitQuizSchema = z.object({
  body: z.object({
    studentId: z.string().nonempty("Student ID is required"),
    answers: z
      .array(z.number().int().nonnegative())
      .min(1, "Answers array cannot be empty"),
  }),
});

export const quizValidation = { submitQuizSchema };
