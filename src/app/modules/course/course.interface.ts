import { Types } from "mongoose";

export interface ICourseLesson {
  title: string;
  videoUrl: string;
}

export interface ICourseBatch {
  name: string;
  startDate: Date;
}

export interface ICourse {
  _id?: string;
  title: string;
  description: string;
  instructor: Types.ObjectId;
  price: number;
  category?: string;
  tags?: string[];
  syllabus?: string[];
  lessons: ICourseLesson[];
  batches?: ICourseBatch[];
}
