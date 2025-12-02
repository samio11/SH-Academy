import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { enrollmentController } from "./enrollment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { enrollmentValidation } from "./enrollment.validation";

const router = Router();

router.post(
  "/enroll",
  checkAuth([ERole.student]),
  validateRequest(enrollmentValidation.enrollStudentSchema),
  enrollmentController.enrollStudent
);

router.get(
  "/student/:studentId",
  checkAuth([...Object.values(ERole)]),
  enrollmentController.getStudentEnrollments
);

router.get(
  "/course/:courseId",
  checkAuth([ERole.admin]),
  enrollmentController.getCourseEnrollments
);

router.post(
  "/complete/:enrollmentId",
  checkAuth([ERole.student]),
  validateRequest(enrollmentValidation.markLessonCompleteSchema),
  enrollmentController.markLessonComplete
);

export const enrollmentRoutes = router;
