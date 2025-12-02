import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { Quiz } from "./quiz.model";

const createQuiz = async (payload: any) => {
  return await Quiz.create(payload);
};

const getQuiz = async (courseId: string, lessonIndex: number) => {
  return await Quiz.findOne({ course: courseId, lessonIndex });
};

const submitQuiz = async (
  quizId: string,
  studentId: string,
  answers: number[]
) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new AppError(404, "Quiz not found");

  let score = 0;
  quiz.questions.forEach((q, index) => {
    if (answers[index] === q.correctIndex) score++;
  });

  quiz.results.push({ student: new Types.ObjectId(studentId), score });
  await quiz.save();

  return { score };
};

export const quizService = { createQuiz, getQuiz, submitQuiz };
