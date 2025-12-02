import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { courseController } from "./course.controller";

const router = Router();

// admin create course
router.post("/create", checkAuth([ERole.admin]), courseController.createCourse);

// public course listing
router.get("/", courseController.getAllCourses);

// single course (public)
router.get("/:id", courseController.getSingleCourse);

// admin update
router.put(
  "/update/:id",
  checkAuth([ERole.admin]),
  courseController.updateCourse
);

// admin delete
router.delete(
  "/delete/:id",
  checkAuth([ERole.admin]),
  courseController.deleteCourse
);

export const courseRoutes = router;
