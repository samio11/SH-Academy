import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { enrollmentController } from "./enrollment.controller";

const router = Router();

router.post(
  "/enroll",
  checkAuth([ERole.student]),
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
  enrollmentController.markLessonComplete
);

export const enrollmentRoutes = router;
