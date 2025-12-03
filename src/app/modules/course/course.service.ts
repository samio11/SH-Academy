import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";

const createCourse = async (payload: ICourse) => {
  const course = await Course.create(payload);
  return course;
};

const getAllCourses = async (query: Record<string, string>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("instructor"),
    query
  );

  const courseData = courseQuery
    .search(["title", "category"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [data, meta] = await Promise.all([
    await courseData.build(),
    await courseData.getMeta(),
  ]);

  return { data, meta };
};

const getCourseById = async (id: string) => {
  const course = await Course.findById(id).populate("instructor");
  if (!course) throw new AppError(404, "Course not found");
  return course;
};

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
  const updated = await Course.findByIdAndUpdate(id, payload, { new: true });
  if (!updated) throw new AppError(404, "Course not found");
  return updated;
};

const deleteCourse = async (id: string) => {
  const deleted = await Course.findByIdAndDelete(id);
  if (!deleted) throw new AppError(404, "Course not found");
  return deleted;
};

export const courseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
