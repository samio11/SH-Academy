import { z } from "zod";

const createCourseSchema = z.object({
  body: z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    instructor: z.string().nonempty("Instructor ID is required"),
    price: z.number().nonnegative("Price must be non-negative").optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    syllabus: z.array(z.string()).optional(),
    lessons: z
      .array(
        z.object({
          title: z.string().nonempty("Lesson title is required"),
          videoUrl: z.string().url("Invalid video URL"),
        })
      )
      .min(1, "At least one lesson is required"),
    batches: z
      .array(
        z.object({
          name: z.string().nonempty("Batch name is required"),
          startDate: z.date(),
        })
      )
      .optional(),
  }),
});

const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    instructor: z.string().optional(),
    price: z.number().nonnegative().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    syllabus: z.array(z.string()).optional(),
    lessons: z
      .array(
        z.object({
          title: z.string(),
          videoUrl: z.string().url(),
        })
      )
      .optional(),
    batches: z
      .array(
        z.object({
          name: z.string(),
          startDate: z.date(),
        })
      )
      .optional(),
  }),
});

export const courseValidation = { createCourseSchema, updateCourseSchema };
