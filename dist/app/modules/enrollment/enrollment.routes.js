"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const enrollment_controller_1 = require("./enrollment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const enrollment_validation_1 = require("./enrollment.validation");
const router = (0, express_1.Router)();
router.post("/enroll", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.student]), (0, validateRequest_1.default)(enrollment_validation_1.enrollmentValidation.enrollStudentSchema), enrollment_controller_1.enrollmentController.enrollStudent);
router.get("/all", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), enrollment_controller_1.enrollmentController.getAllEnrollmentAdmin);
router.get("/student/:studentId", (0, checkAuth_1.checkAuth)([...Object.values(user_interface_1.ERole)]), enrollment_controller_1.enrollmentController.getStudentEnrollments);
router.get("/course/:courseId", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), enrollment_controller_1.enrollmentController.getCourseEnrollments);
router.post("/complete/:enrollmentId", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.student]), (0, validateRequest_1.default)(enrollment_validation_1.enrollmentValidation.markLessonCompleteSchema), enrollment_controller_1.enrollmentController.markLessonComplete);
exports.enrollmentRoutes = router;
