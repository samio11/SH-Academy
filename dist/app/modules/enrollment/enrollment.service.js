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
exports.enrollmentService = void 0;
const enrollment_model_1 = require("./enrollment.model");
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const enrollStudent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield enrollment_model_1.Enrollment.findOne({
        student: payload.student,
        course: payload.course,
    });
    if (exist)
        throw new AppError_1.AppError(400, "Already Enrolled");
    const created = yield enrollment_model_1.Enrollment.create(payload);
    return created;
});
const getStudentEnrollments = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield enrollment_model_1.Enrollment.find({ student: studentId }).populate("course");
});
const getCourseEnrollments = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield enrollment_model_1.Enrollment.find({ course: courseId }).populate("student");
});
const getAllEnrollmentAdmin = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const enrollmentQuery = new QueryBuilder_1.QueryBuilder(enrollment_model_1.Enrollment.find(), query);
    const enrollmentData = enrollmentQuery
        .filter()
        .search([""])
        .sort()
        .paginate()
        .fields();
    const [data, meta] = yield Promise.all([
        yield enrollmentData
            .build()
            .populate("student", "name email")
            .populate("course", "title category"),
        yield enrollmentData.getMeta(),
    ]);
    return { data, meta };
});
const markLessonComplete = (enrollmentId, lessonIndex) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const enrollment = yield enrollment_model_1.Enrollment.findById(enrollmentId);
    if (!enrollment)
        throw new AppError_1.AppError(404, "Enrollment not found");
    if (!enrollment.completedLessons.includes(lessonIndex)) {
        enrollment.completedLessons.push(lessonIndex);
    }
    // progress calculation
    const totalLessons = ((_b = (_a = enrollment.course) === null || _a === void 0 ? void 0 : _a.lessons) === null || _b === void 0 ? void 0 : _b.length) || 1;
    enrollment.progressPercent = Math.floor((enrollment.completedLessons.length / totalLessons) * 100);
    yield enrollment.save();
    return enrollment;
});
exports.enrollmentService = {
    enrollStudent,
    getStudentEnrollments,
    getCourseEnrollments,
    markLessonComplete,
    getAllEnrollmentAdmin,
};
