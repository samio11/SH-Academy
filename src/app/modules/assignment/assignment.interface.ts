import { Types } from "mongoose";

export interface IAssignmentSubmission {
  student: string; // User ID
  answerLink?: string;
  answerText?: string;
  score?: number;
}

export interface IAssignment {
  _id?: string;

  course: Types.ObjectId;
  lessonIndex: number;
  deadLine: Date;

  title: string;
  instructions: string;

  submissions: IAssignmentSubmission[];
}
