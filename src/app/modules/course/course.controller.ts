import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { courseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const payload = {
    ...req?.body,
    thumbnail: req?.file?.path,
  };
  const result = await courseService.createCourse(payload);
  sendResponse(res, {
    statusCode: 201,
    message: "Course Create Done",
    success: true,
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const query = req.query as Record<string, string>;
  const result = await courseService.getAllCourses(query);
  sendResponse(res, {
    statusCode: 200,
    message: "Course Getting Done",
    success: true,
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const result = await courseService.getCourseById(courseId);
  sendResponse(res, {
    statusCode: 200,
    message: "A Course Getting Done",
    success: true,
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const payload = req.body;
  const result = await courseService.updateCourse(courseId, payload);
  sendResponse(res, {
    statusCode: 200,
    message: "Course Update Done",
    success: true,
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const result = await courseService.deleteCourse(courseId);
  sendResponse(res, {
    statusCode: 200,
    message: "Course Delete Done",
    success: true,
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
