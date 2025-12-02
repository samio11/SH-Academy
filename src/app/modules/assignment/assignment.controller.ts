import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { assignmentService } from "./assignment.service";

const createAssignment = catchAsync(async (req, res) => {
  const result = await assignmentService.createAssignment(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "Assignment created successfully",
    success: true,
    data: result,
  });
});

const getAssignment = catchAsync(async (req, res) => {
  const { courseId, lessonIndex } = req.query;
  const result = await assignmentService.getAssignment(
    String(courseId),
    Number(lessonIndex)
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Assignment fetched successfully",
    success: true,
    data: result,
  });
});
const getAllAssignmentAdmin = catchAsync(async (req, res) => {
  const query = req?.query || "";
  const result = await assignmentService.getAllAssignmentAdmin(
    query as Record<string, string>
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Assignment fetched successfully",
    success: true,
    data: result,
  });
});

const submitAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await assignmentService.submitAssignment(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "Assignment submitted successfully",
    success: true,
    data: result,
  });
});

const reviewAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { studentId, score } = req.body;

  const result = await assignmentService.reviewAssignment(id, studentId, score);

  sendResponse(res, {
    statusCode: 200,
    message: "Assignment reviewed successfully",
    success: true,
    data: result,
  });
});

export const assignmentController = {
  createAssignment,
  getAssignment,
  submitAssignment,
  reviewAssignment,
  getAllAssignmentAdmin,
};
