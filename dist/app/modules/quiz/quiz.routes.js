"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const quiz_controller_1 = require("./quiz.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const quiz_validation_1 = require("./quiz.validation");
const router = (0, express_1.Router)();
router.post("/create", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), quiz_controller_1.quizController.createQuiz);
router.get("/all", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), quiz_controller_1.quizController.getAllQuizAdmin);
router.get("/", (0, checkAuth_1.checkAuth)([...Object.values(user_interface_1.ERole)]), quiz_controller_1.quizController.getQuiz);
router.post("/submit/:quizId", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.student]), (0, validateRequest_1.default)(quiz_validation_1.quizValidation.submitQuizSchema), quiz_controller_1.quizController.submitQuiz);
exports.quizRoutes = router;
