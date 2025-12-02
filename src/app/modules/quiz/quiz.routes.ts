import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { quizController } from "./quiz.controller";

const router = Router();

router.post("/create", checkAuth([ERole.admin]), quizController.createQuiz);

router.get("/", checkAuth([...Object.values(ERole)]), quizController.getQuiz);

router.post(
  "/submit/:quizId",
  checkAuth([ERole.student]),
  quizController.submitQuiz
);

export const quizRoutes = router;
