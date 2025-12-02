import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { courseController } from "./course.controller";

const router = Router();

router.post("/create", checkAuth([ERole.admin]), courseController.createCourse);

router.get("/", courseController.getAllCourses);

router.get("/:id", courseController.getSingleCourse);

router.put(
  "/update/:id",
  checkAuth([ERole.admin]),
  courseController.updateCourse
);

router.delete(
  "/delete/:id",
  checkAuth([ERole.admin]),
  courseController.deleteCourse
);

export const courseRoutes = router;
