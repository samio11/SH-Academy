import { Assignment } from "./assignment.model";
import { AppError } from "../../errors/AppError";

const createAssignment = async (payload: any) => {
  return await Assignment.create(payload);
};

const getAssignment = async (courseId: string, lessonIndex: number) => {
  return await Assignment.findOne({ course: courseId, lessonIndex });
};

const submitAssignment = async (id: string, payload: any) => {
  const assignment = await Assignment.findById(id);
  if (!assignment) throw new AppError(404, "Assignment not found");

  assignment.submissions.push(payload);
  await assignment.save();

  return assignment;
};

const reviewAssignment = async (
  id: string,
  studentId: string,
  score: number
) => {
  const assignment = await Assignment.findById(id);
  if (!assignment) throw new AppError(404, "Assignment not found");

  const submission = assignment.submissions.find(
    (s: any) => s.student.toString() === studentId
  );

  if (!submission) throw new AppError(404, "Submission not found");

  submission.score = score;
  await assignment.save();
  return submission;
};

export const assignmentService = {
  createAssignment,
  getAssignment,
  submitAssignment,
  reviewAssignment,
};
