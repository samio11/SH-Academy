import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { adminService } from "./adminState.services";

const getAdminStats = catchAsync(async (req, res, next) => {
  const result = await adminService.getAdminStats();
  sendResponse(res, {
    success: true,
    message: "Admin status getting done",
    statusCode: 200,
    data: result,
  });
});
const getEnrollmentTrends = catchAsync(async (req, res, next) => {
  const result = await adminService.getEnrollmentTrends();
  sendResponse(res, {
    success: true,
    message: "Admin Enroll Trend done",
    statusCode: 200,
    data: result,
  });
});
const getUserGrowth = catchAsync(async (req, res, next) => {
  const result = await adminService.getUserGrowth();
  sendResponse(res, {
    success: true,
    message: "Admin Enroll Trend done",
    statusCode: 200,
    data: result,
  });
});

export const adminStatusController = {
  getAdminStats,
  getEnrollmentTrends,
  getUserGrowth,
};
