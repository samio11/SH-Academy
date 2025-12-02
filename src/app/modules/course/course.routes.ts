import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { courseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";

const router = Router();

router.post(
  "/create",
  checkAuth([ERole.admin]),
  validateRequest(courseValidation.createCourseSchema),
  courseController.createCourse
);

router.get("/", courseController.getAllCourses);

router.get("/:id", courseController.getSingleCourse);

router.put(
  "/update/:id",
  checkAuth([ERole.admin]),
  validateRequest(courseValidation.updateCourseSchema),
  courseController.updateCourse
);

router.delete(
  "/delete/:id",
  checkAuth([ERole.admin]),
  courseController.deleteCourse
);

export const courseRoutes = router;
