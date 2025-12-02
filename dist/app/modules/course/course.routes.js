"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const course_controller_1 = require("./course.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const router = (0, express_1.Router)();
router.post("/create", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), (0, validateRequest_1.default)(course_validation_1.courseValidation.createCourseSchema), course_controller_1.courseController.createCourse);
router.get("/", course_controller_1.courseController.getAllCourses);
router.get("/:id", course_controller_1.courseController.getSingleCourse);
router.put("/update/:id", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), (0, validateRequest_1.default)(course_validation_1.courseValidation.updateCourseSchema), course_controller_1.courseController.updateCourse);
router.delete("/delete/:id", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), course_controller_1.courseController.deleteCourse);
exports.courseRoutes = router;
