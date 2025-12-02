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
exports.courseService = void 0;
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const course_model_1 = require("./course.model");
const createCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.create(payload);
    return course;
});
const getAllCourses = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.QueryBuilder(course_model_1.Course.find().populate("instructor"), query);
    const courseData = courseQuery
        .filter()
        .search(["title", "category"])
        .sort()
        .paginate()
        .fields();
    const [data, meta] = yield Promise.all([
        yield courseData.build(),
        yield courseData.getMeta(),
    ]);
    return { data, meta };
});
const getCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findById(id).populate("instructor");
    if (!course)
        throw new AppError_1.AppError(404, "Course not found");
    return course;
});
const updateCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield course_model_1.Course.findByIdAndUpdate(id, payload, { new: true });
    if (!updated)
        throw new AppError_1.AppError(404, "Course not found");
    return updated;
});
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield course_model_1.Course.findByIdAndDelete(id);
    if (!deleted)
        throw new AppError_1.AppError(404, "Course not found");
    return deleted;
});
exports.courseService = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
};
