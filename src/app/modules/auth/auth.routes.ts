import { Router } from "express";
import { authController } from "./auth.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post("/login", authController.userLogin);
router.post(
  "/register",
  multerUpload.single("file"),
  authController.userRegister
);
router.post("/logout", authController.userLogout);

export const authRoutes = router;
