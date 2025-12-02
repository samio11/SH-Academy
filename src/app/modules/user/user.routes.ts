import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "./user.interface";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();

router.get("/", checkAuth([ERole.admin]), userController.getAllUser);
router.get(
  "/get-single",
  checkAuth([...Object.values(ERole)]),
  userController.getAUser
);
router.put(
  "/update",
  checkAuth([...Object.values(ERole)]),
  validateRequest(userValidation.updateUserSchema),
  userController.updateUser
);

router.post(
  "/block/:userId",
  checkAuth([ERole.admin]),
  userController.blockUser
);
router.post(
  "/un-block/:userId",
  checkAuth([ERole.admin]),
  userController.unBlockUser
);

export const userRoutes = router;
