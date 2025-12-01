import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";

export const rootRouter = Router();

const moduleRoute = [
  {
    path: "/auth",
    element: authRoutes,
  },
];

moduleRoute.forEach((x) => rootRouter.use(x.path, x.element));
