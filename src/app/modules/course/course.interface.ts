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
  price: number;
  category?: string;
  syllabus?: string[];
  lessons: ICourseLesson[];
  batches?: ICourseBatch[];
}
