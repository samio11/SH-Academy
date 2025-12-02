"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const assignment_controller_1 = require("./assignment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const assignment_validation_1 = require("./assignment.validation");
const router = (0, express_1.Router)();
router.post("/create", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), (0, validateRequest_1.default)(assignment_validation_1.assignmentValidation.createAssignmentSchema), assignment_controller_1.assignmentController.createAssignment);
router.get("/", (0, checkAuth_1.checkAuth)([...Object.values(user_interface_1.ERole)]), assignment_controller_1.assignmentController.getAssignment);
router.get("/all", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), assignment_controller_1.assignmentController.getAllAssignmentAdmin);
router.post("/submit/:id", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.student]), (0, validateRequest_1.default)(assignment_validation_1.assignmentValidation.submitAssignmentSchema), assignment_controller_1.assignmentController.submitAssignment);
router.post("/review/:id", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), (0, validateRequest_1.default)(assignment_validation_1.assignmentValidation.reviewAssignmentSchema), assignment_controller_1.assignmentController.reviewAssignment);
exports.assignmentRoutes = router;
