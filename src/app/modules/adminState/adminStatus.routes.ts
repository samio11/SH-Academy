import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { adminStatusController } from "./adminState.controller";

const router = Router();

router.get(
  "/state",
  checkAuth([ERole.admin]),
  adminStatusController.getAdminStats
);
router.get(
  "/enroll",
  checkAuth([ERole.admin]),
  adminStatusController.getEnrollmentTrends
);
router.get(
  "/user",
  checkAuth([ERole.admin]),
  adminStatusController.getUserGrowth
);

export const adminStatusRoutes = router;
