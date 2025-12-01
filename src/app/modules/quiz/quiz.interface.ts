import { Types } from "mongoose";

export interface IQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface IQuizResult {
  student: Types.ObjectId;
  score: number;
}

export interface IQuiz {
  _id?: string;

  course: Types.ObjectId;
  lessonIndex: number;

  questions: IQuizQuestion[];
  results: IQuizResult[];
}
