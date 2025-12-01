import { Types } from "mongoose";

export interface IEnrollment {
  _id?: string;
  student: Types.ObjectId; // User ID
  course: Types.ObjectId; // Course ID
  batchName?: string;
  completedLessons: number[];
  progressPercent: number;
}
