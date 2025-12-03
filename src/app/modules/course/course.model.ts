// models/Course.model.ts
import { Schema, model } from "mongoose";
import { ICourse } from "./course.interface";

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: Number,
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    thumbnail: { type: String },
    tags: [{ type: String }],
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
  },
  { timestamps: true, versionKey: false }
);

export const Course = model("Course", CourseSchema);
