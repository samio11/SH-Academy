import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";

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
];

moduleRoute.forEach((x) => rootRouter.use(x.path, x.element));
