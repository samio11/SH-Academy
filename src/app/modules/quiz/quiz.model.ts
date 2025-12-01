// models/Quiz.model.ts
import { Schema, model } from "mongoose";
import { IQuiz } from "./quiz.interface";

const QuizSchema = new Schema<IQuiz>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    lessonIndex: { type: Number, required: true },

    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctIndex: { type: Number, required: true },
      },
    ],

    results: [
      {
        student: { type: Schema.Types.ObjectId, ref: "User" },
        score: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Quiz = model("Quiz", QuizSchema);
