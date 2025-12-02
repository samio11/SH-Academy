"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("./user.interface");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.get("/", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), user_controller_1.userController.getAllUser);
router.get("/get-single", (0, checkAuth_1.checkAuth)([...Object.values(user_interface_1.ERole)]), user_controller_1.userController.getAUser);
router.put("/update", (0, checkAuth_1.checkAuth)([...Object.values(user_interface_1.ERole)]), (0, validateRequest_1.default)(user_validation_1.userValidation.updateUserSchema), user_controller_1.userController.updateUser);
router.post("/block/:userId", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), user_controller_1.userController.blockUser);
router.post("/un-block/:userId", (0, checkAuth_1.checkAuth)([user_interface_1.ERole.admin]), user_controller_1.userController.unBlockUser);
exports.userRoutes = router;
