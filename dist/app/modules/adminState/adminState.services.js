"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const user_model_1 = require("../user/user.model");
const course_model_1 = require("../course/course.model");
const enrollment_model_1 = require("../enrollment/enrollment.model");
const getAdminStats = () => __awaiter(void 0, void 0, void 0, function* () {
    // Get total counts
    const [totalStudents, totalCourses, totalEnrollments, totalInstructors, blockedUsers,] = yield Promise.all([
        user_model_1.User.countDocuments({ role: "student" }),
        course_model_1.Course.countDocuments(),
        enrollment_model_1.Enrollment.countDocuments(),
        user_model_1.User.countDocuments({ role: "instructor" }),
        user_model_1.User.countDocuments({ isBlocked: true }),
    ]);
    // Get enrollment trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const enrollmentTrends = yield enrollment_model_1.Enrollment.aggregate([
        {
            $match: {
                createdAt: { $gte: thirtyDaysAgo },
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
        {
            $sort: { _id: 1 },
        },
        {
            $project: {
                _id: 0,
                date: "$_id",
                count: 1,
            },
        },
    ]);
    // Get top courses by enrollment
    const topCourses = yield enrollment_model_1.Enrollment.aggregate([
        {
            $group: {
                _id: "$course",
                enrollmentCount: { $sum: 1 },
            },
        },
        {
            $sort: { enrollmentCount: -1 },
        },
        {
            $limit: 5,
        },
        {
            $lookup: {
                from: "courses",
                localField: "_id",
                foreignField: "_id",
                as: "courseInfo",
            },
        },
        {
            $unwind: "$courseInfo",
        },
        {
            $project: {
                _id: 0,
                courseId: "$_id",
                title: "$courseInfo.title",
                enrollmentCount: 1,
            },
        },
    ]);
    // Get category distribution
    const categoryDistribution = yield course_model_1.Course.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                count: 1,
            },
        },
        {
            $sort: { count: -1 },
        },
    ]);
    // Get recent enrollments
    const recentEnrollments = yield enrollment_model_1.Enrollment.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("student", "name")
        .populate("course", "title")
        .select("student course batchName createdAt")
        .lean();
    const formattedRecentEnrollments = recentEnrollments.map((enrollment) => {
        var _a, _b;
        return ({
            _id: enrollment._id.toString(),
            studentName: ((_a = enrollment.student) === null || _a === void 0 ? void 0 : _a.name) || "Unknown",
            courseName: ((_b = enrollment.course) === null || _b === void 0 ? void 0 : _b.title) || "Unknown",
            batchName: enrollment.batchName,
            createdAt: enrollment.createdAt,
        });
    });
    return {
        totalStudents,
        totalCourses,
        totalEnrollments,
        totalInstructors,
        blockedUsers,
        enrollmentTrends,
        topCourses,
        categoryDistribution,
        recentEnrollments: formattedRecentEnrollments,
    };
});
const getEnrollmentTrends = (days = 30) => __awaiter(void 0, void 0, void 0, function* () {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const trends = yield enrollment_model_1.Enrollment.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate },
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
        {
            $sort: { _id: 1 },
        },
        {
            $project: {
                _id: 0,
                date: "$_id",
                count: 1,
            },
        },
    ]);
    return trends;
});
const getUserGrowth = (days = 30) => __awaiter(void 0, void 0, void 0, function* () {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const growth = yield user_model_1.User.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate },
                role: "student",
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
        {
            $sort: { _id: 1 },
        },
        {
            $project: {
                _id: 0,
                date: "$_id",
                count: 1,
            },
        },
    ]);
    return growth;
});
exports.adminService = {
    getAdminStats,
    getEnrollmentTrends,
    getUserGrowth,
};
