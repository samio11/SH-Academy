import { Schema, model } from "mongoose";
import { IAssignment } from "./assignment.interface";

const AssignmentSchema = new Schema<IAssignment>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    lessonIndex: { type: Number, required: true },

    title: { type: String, required: true },
    instructions: { type: String, required: true },
    deadLine: { type: Date, required: true },

    submissions: [
      {
        student: { type: Schema.Types.ObjectId, ref: "User" },
        answerLink: { type: String },
        answerText: { type: String },
        score: { type: Number },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const Assignment = model("Assignment", AssignmentSchema);
