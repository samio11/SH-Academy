import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { assignmentController } from "./assignment.controller";

const router = Router();

router.post(
  "/create",
  checkAuth([ERole.admin]),
  assignmentController.createAssignment
);

router.get(
  "/",
  checkAuth([...Object.values(ERole)]),
  assignmentController.getAssignment
);

router.post(
  "/submit/:id",
  checkAuth([ERole.student]),
  assignmentController.submitAssignment
);

router.post(
  "/review/:id",
  checkAuth([ERole.admin]),
  assignmentController.reviewAssignment
);

export const assignmentRoutes = router;
