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
exports.assignmentService = void 0;
const assignment_model_1 = require("./assignment.model");
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const createAssignment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield assignment_model_1.Assignment.create(payload);
});
const getAssignment = (courseId, lessonIndex) => __awaiter(void 0, void 0, void 0, function* () {
    return yield assignment_model_1.Assignment.findOne({ course: courseId, lessonIndex });
});
const getAllAssignmentAdmin = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const assignmentQuery = new QueryBuilder_1.QueryBuilder(assignment_model_1.Assignment.find(), query);
    const assignmentData = assignmentQuery
        .filter()
        .search(["title"])
        .sort()
        .paginate()
        .fields();
    const [data, meta] = yield Promise.all([
        yield assignmentData.build().populate("course", "title"),
        yield assignmentData.getMeta(),
    ]);
    return { data, meta };
});
const submitAssignment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const assignment = yield assignment_model_1.Assignment.findById(id);
    if (!assignment)
        throw new AppError_1.AppError(404, "Assignment not found");
    assignment.submissions.push(payload);
    yield assignment.save();
    return assignment;
});
const reviewAssignment = (id, studentId, score) => __awaiter(void 0, void 0, void 0, function* () {
    const assignment = yield assignment_model_1.Assignment.findById(id);
    if (!assignment)
        throw new AppError_1.AppError(404, "Assignment not found");
    const submission = assignment.submissions.find((s) => s.student.toString() === studentId);
    if (!submission)
        throw new AppError_1.AppError(404, "Submission not found");
    submission.score = score;
    yield assignment.save();
    return submission;
});
exports.assignmentService = {
    createAssignment,
    getAssignment,
    submitAssignment,
    reviewAssignment,
    getAllAssignmentAdmin,
};
