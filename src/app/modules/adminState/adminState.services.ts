// admin.service.ts
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { Course } from "../course/course.model";
import { Enrollment } from "../enrollment/enrollment.model";

const getAdminStats = async () => {
  // Get total counts
  const [
    totalStudents,
    totalCourses,
    totalEnrollments,
    totalInstructors,
    blockedUsers,
  ] = await Promise.all([
    User.countDocuments({ role: "student" }),
    Course.countDocuments(),
    Enrollment.countDocuments(),
    User.countDocuments({ role: "instructor" }),
    User.countDocuments({ isBlocked: true }),
  ]);

  // Get enrollment trends (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const enrollmentTrends = await Enrollment.aggregate([
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
  const topCourses = await Enrollment.aggregate([
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
  const categoryDistribution = await Course.aggregate([
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
  const recentEnrollments = await Enrollment.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("student", "name")
    .populate("course", "title")
    .select("student course batchName createdAt")
    .lean();

  const formattedRecentEnrollments = recentEnrollments.map(
    (enrollment: any) => ({
      _id: enrollment._id.toString(),
      studentName: enrollment.student?.name || "Unknown",
      courseName: enrollment.course?.title || "Unknown",
      batchName: enrollment.batchName,
      createdAt: enrollment.createdAt,
    })
  );

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
};

const getEnrollmentTrends = async (days: number = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const trends = await Enrollment.aggregate([
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
};

const getUserGrowth = async (days: number = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const growth = await User.aggregate([
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
};

export const adminService = {
  getAdminStats,
  getEnrollmentTrends,
  getUserGrowth,
};
