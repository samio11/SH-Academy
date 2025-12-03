"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const assignment_routes_1 = require("../modules/assignment/assignment.routes");
const course_routes_1 = require("../modules/course/course.routes");
const enrollment_routes_1 = require("../modules/enrollment/enrollment.routes");
const quiz_routes_1 = require("../modules/quiz/quiz.routes");
const adminStatus_routes_1 = require("../modules/adminState/adminStatus.routes");
exports.rootRouter = (0, express_1.Router)();
const moduleRoute = [
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
    {
        path: "/user",
        element: user_routes_1.userRoutes,
    },
    {
        path: "/assignment",
        element: assignment_routes_1.assignmentRoutes,
    },
    {
        path: "/course",
        element: course_routes_1.courseRoutes,
    },
    {
        path: "/enrollment",
        element: enrollment_routes_1.enrollmentRoutes,
    },
    {
        path: "/quiz",
        element: quiz_routes_1.quizRoutes,
    },
    {
        path: "/admin",
        element: adminStatus_routes_1.adminStatusRoutes,
    },
];
moduleRoute.forEach((x) => exports.rootRouter.use(x.path, x.element));
