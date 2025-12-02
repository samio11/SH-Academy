import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { quizService } from "./quiz.service";

const createQuiz = catchAsync(async (req, res) => {
  const result = await quizService.createQuiz(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "Quiz created successfully",
    success: true,
    data: result,
  });
});

const getQuiz = catchAsync(async (req, res) => {
  const { courseId, lessonIndex } = req.query;
  const result = await quizService.getQuiz(
    String(courseId),
    Number(lessonIndex)
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Quiz fetched successfully",
    success: true,
    data: result,
  });
});

const submitQuiz = catchAsync(async (req, res) => {
  const { quizId } = req.params;
  const { studentId, answers } = req.body;

  const result = await quizService.submitQuiz(quizId, studentId, answers);

  sendResponse(res, {
    statusCode: 200,
    message: "Quiz submitted successfully",
    success: true,
    data: result,
  });
});

export const quizController = { createQuiz, getQuiz, submitQuiz };
