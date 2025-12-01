import { Schema, model } from "mongoose";
import { IEnrollment } from "./enrollment.interface";

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    batchName: { type: String },
    completedLessons: [Number], // lesson index numbers
    progressPercent: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

export const Enrollment = model("Enrollment", EnrollmentSchema);
