import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { enrollmentService } from "./enrollment.service";

const enrollStudent = catchAsync(async (req, res) => {
  const result = await enrollmentService.enrollStudent(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "Enrollment successful",
    success: true,
    data: result,
  });
});

const getStudentEnrollments = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await enrollmentService.getStudentEnrollments(studentId);
  sendResponse(res, {
    statusCode: 200,
    message: "Student enrollments fetched",
    success: true,
    data: result,
  });
});

const getCourseEnrollments = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await enrollmentService.getCourseEnrollments(courseId);
  sendResponse(res, {
    statusCode: 200,
    message: "Course enrollments fetched",
    success: true,
    data: result,
  });
});
const getAllEnrollmentAdmin = catchAsync(async (req, res) => {
  const query = req?.query || "";
  const result = await enrollmentService.getAllEnrollmentAdmin(
    query as Record<string, string>
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Course enrollments fetched",
    success: true,
    data: result,
  });
});

const markLessonComplete = catchAsync(async (req, res) => {
  const { enrollmentId } = req.params;
  const { lessonIndex } = req.body;

  const result = await enrollmentService.markLessonComplete(
    enrollmentId,
    Number(lessonIndex)
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Lesson marked as complete",
    success: true,
    data: result,
  });
});

export const enrollmentController = {
  enrollStudent,
  getStudentEnrollments,
  getCourseEnrollments,
  markLessonComplete,
  getAllEnrollmentAdmin,
};
