import { Enrollment } from "./enrollment.model";
import { AppError } from "../../errors/AppError";

const enrollStudent = async (payload: any) => {
  const exist = await Enrollment.findOne({
    student: payload.student,
    course: payload.course,
  });

  if (exist) throw new AppError(400, "Already Enrolled");

  const created = await Enrollment.create(payload);
  return created;
};

const getStudentEnrollments = async (studentId: string) => {
  return await Enrollment.find({ student: studentId }).populate("course");
};

const getCourseEnrollments = async (courseId: string) => {
  return await Enrollment.find({ course: courseId }).populate("student");
};

const markLessonComplete = async (
  enrollmentId: string,
  lessonIndex: number
) => {
  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) throw new AppError(404, "Enrollment not found");

  if (!enrollment.completedLessons.includes(lessonIndex)) {
    enrollment.completedLessons.push(lessonIndex);
  }

  // progress calculation
  const totalLessons = (enrollment.course as any)?.lessons?.length || 1;
  enrollment.progressPercent = Math.floor(
    (enrollment.completedLessons.length / totalLessons) * 100
  );

  await enrollment.save();
  return enrollment;
};

export const enrollmentService = {
  enrollStudent,
  getStudentEnrollments,
  getCourseEnrollments,
  markLessonComplete,
};
