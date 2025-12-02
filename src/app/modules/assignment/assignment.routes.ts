import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { assignmentController } from "./assignment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { assignmentValidation } from "./assignment.validation";

const router = Router();

router.post(
  "/create",
  checkAuth([ERole.admin]),
  validateRequest(assignmentValidation.createAssignmentSchema),
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
  validateRequest(assignmentValidation.submitAssignmentSchema),
  assignmentController.submitAssignment
);

router.post(
  "/review/:id",
  checkAuth([ERole.admin]),
  validateRequest(assignmentValidation.reviewAssignmentSchema),
  assignmentController.reviewAssignment
);

export const assignmentRoutes = router;
