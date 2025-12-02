import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { Quiz } from "./quiz.model";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createQuiz = async (payload: any) => {
  return await Quiz.create(payload);
};

const getQuiz = async (courseId: string, lessonIndex: number) => {
  return await Quiz.findOne({ course: courseId, lessonIndex });
};

const getAllQuizAdmin = async (query: Record<string, string>) => {
  const quizQuery = new QueryBuilder(Quiz.find(), query);
  const quizData = quizQuery.filter().search([""]).sort().paginate().fields();
  const [data, meta] = await Promise.all([
    await quizData.build().populate("course", "title"),
    await quizData.getMeta(),
  ]);
  return { data, meta };
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

export const quizService = { createQuiz, getQuiz, submitQuiz, getAllQuizAdmin };
