import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { assignmentRoutes } from "../modules/assignment/assignment.routes";
import { courseRoutes } from "../modules/course/course.routes";
import { enrollmentRoutes } from "../modules/enrollment/enrollment.routes";
import { quizRoutes } from "../modules/quiz/quiz.routes";

export const rootRouter = Router();

const moduleRoute = [
  {
    path: "/auth",
    element: authRoutes,
  },
  {
    path: "/user",
    element: userRoutes,
  },
  {
    path: "/assignment",
    element: assignmentRoutes,
  },
  {
    path: "/course",
    element: courseRoutes,
  },
  {
    path: "/enrollment",
    element: enrollmentRoutes,
  },
  {
    path: "/quiz",
    element: quizRoutes,
  },
];

moduleRoute.forEach((x) => rootRouter.use(x.path, x.element));
