import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { quizController } from "./quiz.controller";
import validateRequest from "../../middlewares/validateRequest";
import { quizValidation } from "./quiz.validation";

const router = Router();

router.post("/create", checkAuth([ERole.admin]), quizController.createQuiz);

router.get("/", checkAuth([...Object.values(ERole)]), quizController.getQuiz);

router.post(
  "/submit/:quizId",
  checkAuth([ERole.student]),
  validateRequest(quizValidation.submitQuizSchema),
  quizController.submitQuiz
);

export const quizRoutes = router;
